
export class FlowComponentWorker {

    constructFlowsInfo(flows_info: Array<Object>, nodeResponse: any) {
        const flows = [];
        flows_info.forEach((flow: any) => {
            let temp: any = { flowName: flow.flowName };
            if (nodeResponse.flowAction && nodeResponse.flowAction.length > 0) {
                nodeResponse.flowAction.filter((e) => {
                    if (flow.flowName === e.methodName && (e.apiAction === 'post' || e.apiAction === 'put')) {
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
        return flows;
    }

    constructGpRoute(route_info: Array<Object>) {
        if(route_info.length > 0) {
            const routes = [];
            route_info.forEach((element: any) => {
                let temp: any = {};
                temp.flowName = element.methodName;
                temp.navigationUrl = './' + element.screenName;
                temp.objectName = 'this.router';
                routes.push(temp);
            });
            return routes;
        } else {
            return route_info;
        }
    }

    constructLifecycle(desktop: Array<Object>, desktopElement: any) {
        const lifecycle = [];
        const routeInfoObject: Array<Object> = desktop.filter((e: any) => e.route_info.length > 0);
        routeInfoObject.forEach((element: any) => {
            const routeInfo = element.route_info.filter((e: any) => e.screenId === desktopElement._id);
            console.log('routeInfo======>>>>', routeInfo);
            if(routeInfo && routeInfo.length > 0) {
                const temp: any = {};
                // temp.getParams = 'this.activatedRoute.queryParams.subscribe(params => { this.queryId = params.id; this.GpGetNounById();});';
                temp.queryParams = true;
                lifecycle.push(temp);
            }
        });
        console.log('lifecycle------>>>>>>>', lifecycle);
        return lifecycle;
    }
}