import { Constant } from '../../config/Constant';
import { queryParamSubscribe } from '../../config/componentDependency';
import { convertToObject } from 'typescript';

export class FlowComponentWorker {
    /**
     * @param flows_info 
     * @param nodeResponse 
     * @param microflowObject 
     * @param entities 
     * Constructing the flows like GpCreate, GpUpdte, etc...
     */
    constructFlowsInfo(details, desktopElement, flows_info: Array<Object>, nodeResponse: any, microflowObject: any, entities: any) {
        const flows = [];
        const gjs_components: any = JSON.parse(desktopElement['gjs-components'][0]);
        flows_info.forEach((flow: any) => {
            if (nodeResponse && nodeResponse.flowAction && nodeResponse.flowAction.length > 0) {
                nodeResponse.flowAction.filter((e) => {
                    if (flow.flowName === e.methodName) {
                        let temp: any = { flowName: flow.flowName, lifeCycleData: '' };
                        temp.lifeCycleData = '';
                        if(gjs_components[0].events === 'OnLoad') {
                            temp.lifeCycleData = 'OnLoad';
                        }
                        // if (nodeResponse && nodeResponse.flowAction && nodeResponse.flowAction.length > 0) {
                        nodeResponse.flowAction.filter((e) => {
                            if (flow.flowName === e.methodName && (e.apiAction === 'post' || e.apiAction === 'put' || e.methodName == Constant.GP_SEARCH_FLOW)) {
                                temp.parameterName = 'this.' + e.variableName;
                            }
                            temp.entityName = 'this.' + e.variableName;
                        });
                        // }
                        // Mapping the GpCreate and GpUpdate Flow Actions Body
                        if (flow.flowName === Constant.GP_CREATE_FLOW || flow.flowName === Constant.GP_UPDATE_FLOW) {
                            const variables = [];
                            const flowAction = nodeResponse && nodeResponse.flowAction ? nodeResponse.flowAction.filter((item) => item.methodName === Constant.GP_CREATE_FLOW || item.methodName === Constant.GP_UPDATE_FLOW) : null;
                            if (flowAction && flowAction.length > 0) {
                                entities.forEach((element: any) => {
                                    if (element.name === flowAction[0].variableName) {
                                        element.field.forEach((fieldElement: any) => {
                                            variables.push(`this.${element.name}.${fieldElement.name} = ''`);
                                        });
                                    }
                                });
                            }
                            if (variables.length > 0) {
                                temp.body = variables.join('\n \t \t');
                            }
                        }
                        // Mapping the GpGetNounById Flow Action Body
                        if (flow.flowName === Constant.GP_GETNOUNBYID_FLOW) {
                            const variables = [];
                            const flowAction = nodeResponse.flowAction.filter((item) => item.methodName === Constant.GP_GETNOUNBYID_FLOW);
                            if (flowAction && flowAction.length > 0) {
                                entities.forEach((element: any) => {
                                    if (element.name === flowAction[0].variableName) {
                                        variables.push(`this.${element.name} = data`);
                                    }
                                });
                            }
                            if (variables.length > 0) {
                                temp.body = variables.join('\n \t \t');
                            }
                        }
                        // Mapping the GpDelete Flow Action Body
                        if (flow.flowName === Constant.GP_DELETE_FLOW) {
                            const variables = [];
                            const flowAction = nodeResponse.flowAction.filter((item) => item.methodName === Constant.GP_DELETE_FLOW);
                            if (flowAction && flowAction.length > 0) {
                                variables.push(`this.${Constant.GP_GETNOUNBYID_FLOW}();`);
                            }
                            if (variables.length > 0) {
                                temp.body = variables.join('\n \t \t');
                            }
                        }
                        // Mapping the GpSearch and GpGetAllValues Flow Actions Body
                        if (flow.flowName === Constant.GP_SEARCH_FLOW || flow.flowName === Constant.GP_GETALLVALUES_FLOW) {
                            const variables = [];
                            let entityName = '';
                            let lifeCycleData: any;
                            const flowAction = nodeResponse.flowAction.filter((item) => item.methodName === Constant.GP_SEARCH_FLOW || item.methodName === Constant.GP_GETALLVALUES_FLOW);
                            if(flow.flowName === Constant.GP_SEARCH_FLOW) {
                                variables.push(`this.rowData = data;`);
                            } else if(flow.flowName === Constant.GP_GETALLVALUES_FLOW) {
                                let getallFlowEntities = desktopElement.entity_info.filter((x) => x.htmlId === flow.htmlId);
                                if(getallFlowEntities.length === 0) {
                                    variables.push(`this.rowData = data;`);
                                }
                            }
                            desktopElement.entity_info.forEach(entity => {
                                if (entity.htmlId === flow.htmlId) {
                                    let entites = details.entities.filter((x) => x._id === entity.entityId);
                                    let entityObject = entites[0];
                                    entityObject.field.forEach((fieldData) => {
                                        if(fieldData._id === entity.fields.fieldId && fieldData.type_name === 'Entity') {
                                            entityName = fieldData.entity_id.name;
                                            temp.flowName = fieldData.entity_id.name + Constant.GP_GETALLVALUES_FLOW;
                                        }
                                    });
                                }
                                if (flowAction && flowAction.length > 0) {
                                    if (gjs_components.length > 0) {
                                        gjs_components.forEach(gjs_element => {
                                            if(gjs_element.components) {
                                                if (gjs_element.components.length > 0) {
                                                    gjs_element.components.forEach(data => {
                                                        if(data.components && data.components.length > 0) {
                                                            data.components.forEach(childData => {
                                                                if(childData.components && childData.components.length > 0) {
                                                                    childData.components.forEach(grandChildData => {
                                                                        if (grandChildData.type === 'dynamicdropdown-type' && entity.htmlId === grandChildData.attributes.id) {
                                                                            let entites = details.entities.filter((x) => x._id === entity.entityId);
                                                                            let entityObject = entites[0];
                                                                            entityObject.field.forEach((fieldData) => {
                                                                                if(fieldData._id === entity.fields.fieldId && fieldData.type_name === 'Entity') {
                                                                                    if (entityName === fieldData.entity_id.name) {
                                                                                        variables.push(`this.${fieldData.entity_id.name}itemArray = data;`);
                                                                                    }
                                                                                }
                                                                            });
                                                                        }
                                                                    })
                                                                }
                                                                if (childData.type === 'dynamicdropdown-type' && entity.htmlId === childData.attributes.id) {
                                                                    let entites = details.entities.filter((x) => x._id === entity.entityId);
                                                                    let entityObject = entites[0];
                                                                    entityObject.field.forEach((fieldData) => {
                                                                        if(fieldData._id === entity.fields.fieldId && fieldData.type_name === 'Entity') {
                                                                            if (entityName === fieldData.entity_id.name) {
                                                                                variables.push(`this.${fieldData.entity_id.name}itemArray = data;`);
                                                                            }
                                                                        }
                                                                    });
                                                                }
                                                            })
                                                        }
                                                        if (data.type === 'dynamicdropdown-type' && entity.htmlId === data.attributes.id) {
                                                            let entites = details.entities.filter((x) => x._id === entity.entityId);
                                                            let entityObject = entites[0];
                                                            entityObject.field.forEach((fieldData) => {
                                                                if(fieldData._id === entity.fields.fieldId && fieldData.type_name === 'Entity') {
                                                                    if (entityName === fieldData.entity_id.name) {
                                                                        variables.push(`this.${fieldData.entity_id.name}itemArray = data;`);
                                                                    }
                                                                }
                                                            });
                                                        }
                                                    })
                                                }
                                            }
                                        })
                                    }

                                }
                            })
                            if (variables.length > 0) {
                                temp.body = variables.join('\n \t \t');
                            }
                        }
                        const duplicateFlows = flows.filter((e) => e.flowName === flow.flowName);
                        if (duplicateFlows.length === 0) {
                            flows.push(temp);
                        }
                    }
                });
            }
        });
        microflowObject.GpCodeToAdd['flows_info'] = flows;
        microflowObject.GpCodeToAdd['flows_info'].forEach((e) => {
            if (e.flowName === Constant.GP_GETNOUNBYID_FLOW || e.flowName === Constant.GP_DELETE_FLOW) {
                e.parameterName = 'this.queryId';
                const variable = {
                    name: 'queryId',
                    dataType: 'any'
                }
                if (microflowObject.GpOptions['variables'].findIndex((e) => e.name === 'queryId') === -1) {
                    microflowObject.GpOptions['variables'].push(variable);
                }
            }
        });
        return microflowObject;
    }
}