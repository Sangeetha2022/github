
export class FlowComponentWorker {

    constructFlowsInfo(flows_info: Array<Object>, nodeResponse: any, microflowObject: any, entities: any) {
        const flows = [];
        flows_info.forEach((flow: any) => {
            let temp: any = { flowName: flow.flowName };
            if (nodeResponse.flowAction && nodeResponse.flowAction.length > 0) {
                nodeResponse.flowAction.filter((e) => {
                    if (flow.flowName === e.methodName && (e.apiAction === 'post' || e.apiAction === 'put' || e.methodName == 'GpSearch')) {
                        temp.parameterName = 'this.' + e.variableName;
                    }
                    temp.entityName = 'this.' + e.variableName;
                });
            }
            const duplicateFlows = flows.filter((e)  => e.flowName === flow.flowName);
            if(duplicateFlows.length === 0) {
                flows.push(temp);
            }
        });
        microflowObject.GpCodeToAdd['flows_info'] = flows;
        entities.forEach((entity) => {
            microflowObject.GpCodeToAdd['flows_info'].forEach((e) => {
                if (e.parameterName && 'this.' + entity.name === e.parameterName) {
                    e.field = entity.field;
                }
            });
        });
        microflowObject.GpCodeToAdd['flows_info'].forEach((e) => {
            if (e.flowName === 'GpGetNounById' || e.flowName === 'GpDelete') {
                e.parameterName = 'this.queryId';
                const variable = {
                    name: 'queryId',
                    dataType: 'any'
                }
                if(microflowObject.GpOptions['variables'].findIndex((e) => e.name === 'queryId') === -1) {
                    microflowObject.GpOptions['variables'].push(variable);
                }
            }
        });
        return microflowObject;
    }

    constructGpRoute(route_info: Array<Object>, microflowObject: any) {
        if(route_info.length > 0) {
            const routes = [];
            route_info.forEach((element: any) => {
                let temp: any = {};
                temp.flowName = element.methodName;
                temp.navigationUrl = './' + element.screenName;
                temp.objectName = 'this.router';
                temp.parameterName = 'queryId'
                routes.push(temp);
            });
            routes.push({
                flowName: 'onSelectionChanged',
                parameterName: 'event',
            });
            microflowObject.GpCodeToAdd['route_info'] = routes;
            if (microflowObject.GpCodeToAdd['route_info'].length > 0) {
                microflowObject.GpHeaders.push({
                    "importName": "Router",
                    "importPath": "@angular/router"
                });
                microflowObject.GpOptions.constructor.push({
                    "className": "Router",
                    "objectName": "router"
                });
            }
        } else {
            microflowObject.GpCodeToAdd['route_info'] = [];
        }
        return microflowObject;
    }

    constructLifecycle(desktop: Array<Object>, desktopElement: any, microflowObject: any) {
        const lifecycle = [];
        const routeInfoObject: Array<Object> = desktop.filter((e: any) => e.route_info.length > 0);
        routeInfoObject.forEach((element: any) => {
            const routeInfo = element.route_info.filter((e: any) => e.screenId === desktopElement._id);
            if(routeInfo && routeInfo.length > 0) {
                const temp: any = {};
                temp.queryParams = true;
                lifecycle.push(temp);
            }
        });
        microflowObject.GpCodeToAdd['lifecycle_info'] = lifecycle;
        if (microflowObject.GpCodeToAdd['lifecycle_info'].length > 0) {
            microflowObject.GpCodeToAdd['lifecycle_info'].forEach((element: any) => {
                if (element.queryParams && element.queryParams === true) {
                    microflowObject.GpHeaders.push({
                        "importName": "ActivatedRoute",
                        "importPath": "@angular/router"
                    });
                    microflowObject.GpOptions.constructor.push({
                        "className": "ActivatedRoute",
                        "objectName": "activatedRoute"
                    });
                }
            });
        }
        microflowObject.GpCodeToAdd['flows_info'].forEach((element: any) => {
            if(element.flowName === 'GpGetAllValues') {
                microflowObject.GpCodeToAdd['lifecycle_info'].push({getAll: true});
            }
        });
        return microflowObject;
    }
}