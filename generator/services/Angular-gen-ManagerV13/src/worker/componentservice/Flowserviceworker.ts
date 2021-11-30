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
        let gjs_components = JSON.parse(desktopElement['gjs-components'][0]);
        flows_info.forEach((flow: any) => {
            if (nodeResponse && nodeResponse.flowAction && nodeResponse.flowAction.length > 0) {
                nodeResponse.flowAction.filter(async (e) => {
                    if (flow.flowName === e.methodName) {
                        if (e.routeUrl.includes('/:id')) {
                            e.routeUrl = e.routeUrl.replace('/:id', '');
                        }
                        const duplicateFlows = flows.filter((e) => e.methodName === flow.flowName);
                        if (duplicateFlows.length === 0) {
                            // Mapping GpCreate and GpUpdate Flow Actions Body
                            if (e.methodName === Constant.GP_CREATE_FLOW || e.methodName === Constant.GP_UPDATE_FLOW) {
                                e['paramName'] = e.variableName;
                                e['body'] = `let jwt_token = sessionStorage.getItem('JwtToken');\n \t \treturn this.http.${e.apiAction}(this.sharedService.DESKTOP_API + '${e.routeUrl}' + ${Constant.JWT_TOKEN}, ${e['paramName']});`;
                                flows.push(e);
                            }
                            // Mapping GpGetNounById and GpDelete Flow Actions Body
                            if (e.methodName === Constant.GP_GETNOUNBYID_FLOW || e.methodName === Constant.GP_DELETE_FLOW) {
                                e['paramName'] = e.variableName + 'Id';
                                e['body'] = `let jwt_token = sessionStorage.getItem('JwtToken');\n \t \treturn this.http.${e.apiAction}(this.sharedService.DESKTOP_API + '${e.routeUrl}/' + ${e['paramName']} + ${Constant.JWT_TOKEN});`;
                                flows.push(e);
                            }
                            // Mapping GpGetAllValues Flow Action Body
                            if (e.methodName === Constant.GP_GETALLVALUES_FLOW) {
                                let flowActionObject: any = {};
                                await desktopElement.entity_info.forEach(entity => {
                                    if (entity.htmlId === flow.htmlId) {
                                        let entites = details.entities.filter((x) => x._id === entity.entityId);
                                        let entityObject = entites[0];
                                        entityObject.field.forEach((fieldData) => {
                                            if (fieldData._id === entity.fields.fieldId && fieldData.type_name === 'Entity') {
                                                flowActionObject.apiAction = e.apiAction;
                                                flowActionObject.variableName = fieldData.entity_id.name;
                                                flowActionObject.methodName = fieldData.entity_id.name + Constant.GP_GETALLVALUES_FLOW;
                                                flowActionObject.routeUrl = `/${fieldData.entity_id.name}`;
                                                flowActionObject['body'] = `let jwt_token = sessionStorage.getItem('JwtToken');\n \t \treturn this.http.${flowActionObject.apiAction}(this.sharedService.DESKTOP_API + '${flowActionObject.routeUrl}' + ${Constant.JWT_TOKEN});`;
                                            }
                                        })
                                    }
                                })
                                gjs_components.forEach(item => {
                                    if(item.type === 'grid-type') {
                                        if(item.attributes.id === flow.htmlId) {
                                            flowActionObject = e;
                                            flowActionObject['body'] = `let jwt_token = sessionStorage.getItem('JwtToken');\n \t \treturn this.http.${flowActionObject.apiAction}(this.sharedService.DESKTOP_API + '${flowActionObject.routeUrl}' + ${Constant.JWT_TOKEN});`;
                                        }
                                    }
                                })
                                flows.push(flowActionObject);
                            }
                            // Mapping GpSearch Flow Action Body
                            if (e.methodName === Constant.GP_SEARCH_FLOW) {
                                e['paramName'] = e.variableName;
                                e['body'] = gpSearchBody.join('\n \t \t');
                                e['body'] = e['body'].replace('paramName', e.variableName);
                                e['body'] = e['body'] + "\n \t \tlet jwt_token = sessionStorage.getItem('JwtToken');\n \t \treturn this.http." + e.apiAction + "(this.sharedService.DESKTOP_API + `" + e.routeUrl + "?jwt_token=${jwt_token}${temp.length > 0 ? `&${temp.join('&')}` : ''}`);";
                                flows.push(e);
                            }
                        }
                    }
                });
            }
        });
        microflowObject.GpCodeToAdd['flows_info'] = flows;
        return microflowObject;
    }
}
