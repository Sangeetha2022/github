import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';

export class SpecialDropDown {
    async specialDropDownHTMLGeneration(dropDownData, screenData, details, callback) {
        let screenEntityDetails = screenData.entity_info;
        let overAllEntities = details.entities;
        let screenFlowDetails = screenData.flows_info;
        let projectGenerationPath = details.projectGenerationPath;
        let applicationPath = projectGenerationPath + '/src/app';
        let screenName = screenData.screenName;
        if (dropDownData.components !== undefined) {
            dropDownData.components.forEach(component => {
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
                        if (childComponentData.name !== undefined) {
                            screenEntityDetails.forEach(async (entityField: any) => {
                                if (childComponentData.name === entityField.elementName) {
                                    overAllEntities.forEach((entity: any) => {
                                        if (entityField.entityId === entity._id) {
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
            dropDownData: dropDownData
        }

        let templatePath = path.resolve(__dirname, './template');
        let filePath = templatePath + `/SpecialDropDown.handlebars`;
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
