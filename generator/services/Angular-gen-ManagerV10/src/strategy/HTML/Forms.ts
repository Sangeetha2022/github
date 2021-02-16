import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

export class Forms {


    async formHTMLGeneration(formData, screenData, details, callback) {
        let screenEntityDetails = screenData.entity_info;
        let overAllEntities = details.entities;
        let screenFlowDetails = screenData.flows_info;
        let projectGenerationPath = details.projectGenerationPath;
        let applicationPath = projectGenerationPath + '/src/app';
        let screenName = screenData.screenName;
        if (formData.components !== undefined) {
            formData.components.forEach(component => {
                if (component.classes !== undefined) {
                    component.cssClassName = '';
                    component.classes.forEach((classData, index) => {
                        component.cssClassName += `${classData.name}`;
                        if (component.classes.length - 1 == index) {
                        } else {
                            component.cssClassName += ` `;
                        }
                    })
                }
                if (component.components !== undefined) {
                    component.components.forEach((childComponentData, index) => {
                        if(childComponentData.components !== undefined) {
                            childComponentData.components.forEach((grandChildComponentData, index) => {
                                if (grandChildComponentData.name !== undefined) {
                                    screenEntityDetails.forEach(async (entityField: any) => {
                                        if (grandChildComponentData.name === entityField.elementName) {
                                            overAllEntities.forEach((entity: any) => {
                                                if (entityField.entityId === entity._id) {
                                                    entity.field.forEach(fieldData => {
                                                        if(fieldData._id === entityField.fields.fieldId && fieldData.type_name === 'Entity') {
                                                            let mappedFieldDetails = fieldData.entity_id.field.filter((x) => x._id === fieldData.entity_field);
                                                            let fieldDataObject = mappedFieldDetails[0];
                                                            entityField.mappedEntityName = fieldData.entity_id.name;
                                                            entityField.mappedEntityFieldName = fieldDataObject.name;
                                                        }
                                                    })
                                                    entityField.entityName = entity.name;
                                                    grandChildComponentData.attributes.entityDetails = entityField;
                                                }
                                            })
                                        }
                                    })
                                }
                                screenFlowDetails.forEach((flow: any) => {
                                    if (grandChildComponentData.name === flow.elementName) {
                                        grandChildComponentData.flowDetails = flow;
                                    }
                                })
                                if (grandChildComponentData.classes !== undefined) {
                                    grandChildComponentData.cssClass = '';
                                    grandChildComponentData.classes.forEach((childComponentClassData, index) => {
                                        grandChildComponentData.cssClass += `${childComponentClassData.name}`;
                                        if (grandChildComponentData.classes.length - 1 == index) {
                                        } else {
                                            grandChildComponentData.cssClass += ` `;
                                        }
                                    })
                                }
                            });
                        }
                        if (childComponentData.name !== undefined) {
                            screenEntityDetails.forEach(async (entityField: any) => {
                                if (childComponentData.name === entityField.elementName) {
                                    overAllEntities.forEach((entity: any) => {
                                        if (entityField.entityId === entity._id) {
                                            entity.field.forEach(fieldData => {
                                                if(fieldData._id === entityField.fields.fieldId && fieldData.type_name === 'Entity') {
                                                    let mappedFieldDetails = fieldData.entity_id.field.filter((x) => x._id === fieldData.entity_field);
                                                    let fieldDataObject = mappedFieldDetails[0];
                                                    entityField.mappedEntityName = fieldData.entity_id.name;
                                                    entityField.mappedEntityFieldName = fieldDataObject.name;
                                                }
                                            })
                                            entityField.entityName = entity.name;
                                            childComponentData.attributes.entityDetails = entityField;
                                        }
                                    })
                                }
                            })
                        }
                        screenFlowDetails.forEach((flow: any) => {
                            if (childComponentData.name === flow.elementName) {
                                childComponentData.flowDetails = flow;
                            }
                        })
                        if (childComponentData.classes !== undefined) {
                            childComponentData.cssClass = '';
                            childComponentData.classes.forEach((childComponentClassData, index) => {
                                childComponentData.cssClass += `${childComponentClassData.name}`;
                                if (childComponentData.classes.length - 1 == index) {
                                } else {
                                    childComponentData.cssClass += ` `;
                                }
                            })
                        }
                    });
                }
            });
        }

        let fileData = {
            components: formData.components
        }

        let templatePath = path.resolve(__dirname, './template');
        let filePath = templatePath + `/${formData.tagName}.handlebars`;
        let screenGenerationPath = applicationPath + `/${screenName}`
        let result: any = await this.handleBarsFile(filePath, fileData);
        callback(result);
    }


    handleBarsFile(filePath, fileData) {
        return new Promise(resolve => {
            fs.readFile(filePath, 'utf-8', (err, data) => {
                let source = data;
                Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
                    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
                });
                let template = Handlebars.compile(source);
                let result = template(fileData);
                resolve(result);
            });
        })
    }
}