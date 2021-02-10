import { Constant } from '../../config/Constant'
import { gpSearchBody } from '../../config/componentDependency';

export class FlowServiceWorker {
    /**
     * @param flows_info 
     * @param nodeResponse 
     * @param microflowObject 
     * Constructing Flows like GpCreate, GpUpdate, etc... http request methods
     */
    constructFlowsInfo(details, desktopElement, flows_info: Array<Object>, nodeResponse: any, microflowObject: any) {
        const flows = [];
        flows_info.forEach((flow: any) => {
            if (nodeResponse && nodeResponse.flowAction && nodeResponse.flowAction.length > 0) {
                nodeResponse.flowAction.filter((e) => {
                    if (flow.flowName === e.methodName) {
                        if (e.routeUrl.includes('/:id')) {
                            e.routeUrl = e.routeUrl.replace('/:id', '');
                        }
                        const duplicateFlows = flows.filter((e) => e.methodName === flow.flowName);
                        if (duplicateFlows.length === 0) {
                            // Mapping GpCreate and GpUpdate Flow Actions Body
                            if(e.methodName === Constant.GP_CREATE_FLOW || e.methodName === Constant.GP_UPDATE_FLOW) {
                                e['paramName'] = e.variableName;
                                e['body'] = `return this.http.${e.apiAction}(this.sharedService.DESKTOP_API + '${e.routeUrl}', ${e['paramName']});`;
                            }
                            // Mapping GpGetNounById and GpDelete Flow Actions Body
                            if(e.methodName === Constant.GP_GETNOUNBYID_FLOW || e.methodName === Constant.GP_DELETE_FLOW) {
                                e['paramName'] = e.variableName + 'Id';
                                e['body'] = `return this.http.${e.apiAction}(this.sharedService.DESKTOP_API + '${e.routeUrl}/' + ${e['paramName']});`;
                            }
                            // Mapping GpGetAllValues Flow Action Body
                            if(e.methodName === Constant.GP_GETALLVALUES_FLOW) {
                                desktopElement.entity_info.forEach(entity => {
                                    if(entity.htmlId === flow.htmlId) {
                                        let entites = details.entities.filter((x) => x._id === entity.entityId);
                                        let entityObject = entites[0];
                                        e.routeUrl = e.routeUrl.replace(e.routeUrl, `/${entityObject.name}`);
                                        e['body'] = `return this.http.${e.apiAction}(this.sharedService.DESKTOP_API + '${e.routeUrl}');`;
                                    } else {
                                        e['body'] = `return this.http.${e.apiAction}(this.sharedService.DESKTOP_API + '${e.routeUrl}');`;
                                    }
                                })
                                
                            }
                            // Mapping GpSearch Flow Action Body
                            if(e.methodName === Constant.GP_SEARCH_FLOW) {
                                e['paramName'] = e.variableName;
                                e['body'] = gpSearchBody.join('\n \t \t');
                                e['body'] = e['body'].replace('paramName', e.variableName);
                                e['body'] = e['body'] + "\n \t \treturn this.http." + e.apiAction + "(this.sharedService.DESKTOP_API + `" + e.routeUrl + "${temp.length > 0 ? `?${temp.join('&')}` : ''}`);";
                            }
                            flows.push(e);
                        }
                    }
                });
            }
        });
        microflowObject.GpCodeToAdd['flows_info'] = flows;
        return microflowObject;
    }
}