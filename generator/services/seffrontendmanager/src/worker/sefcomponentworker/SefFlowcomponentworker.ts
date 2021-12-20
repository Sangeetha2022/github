import { Constant } from '../../config/Constant';
import { queryParamSubscribe } from '../../config/componentDependency';
import { convertToObject } from 'typescript';

export class SefFlowComponentWorker {
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
                    console.log("node completed", e.methodName);
                    if (flow.flowName === e.methodName) {
                        console.log('method also complterd');
                        let temp: any = { flowName: flow.flowName, lifeCycleData: '' };
                        temp.lifeCycleData = '';
                        if(gjs_components[0].events === 'OnLoad') {
                            temp.lifeCycleData = 'OnLoad';
                        }
                        // Mapping the GpSEF
                        if (flow.flowName === Constant.GP_SEF_FLOW ) {
                            const variables = [];
                            let entityName = '';
                            let lifeCycleData: any;
                            const flowAction = nodeResponse.flowAction.filter((item) => item.methodName === Constant.GP_SEF_FLOW );
                            if(flow.flowName === Constant.GP_SEF_FLOW) {
                                variables.push(`this.firstName = logindetails.firstname;\n \t \tthis.lastName = logindetails.lastname;});
                                const colors = ['#006400', '#B22222'];

                                this.sefscreenService.getChartData(this.Id).subscribe(getCharts => {
                                // tslint:disable-next-line:radix
                                this.open = getCharts.data1;
                                console.log(this.open);
                                // tslint:disable-next-line:radix
                                this.close = getCharts.data2;
                                console.log(this.close);

                                `);
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