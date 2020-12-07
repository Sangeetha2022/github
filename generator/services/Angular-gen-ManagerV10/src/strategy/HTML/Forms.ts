import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import { response } from 'express';
import { couldStartTrivia } from 'typescript';
import * as path from 'path';
import { Common } from '../../config/Common';

export class Forms {


    async formHTMLGeneration(formData, screenData, details, callback) {
        var stylesData = JSON.parse(screenData['gjs-styles']);
        var screenEntityDetails = screenData.entity_info;
        var overAllEntities = details.entities;
        var screenFlowDetails = screenData.flows_info;
        let projectGenerationPath = details.projectGenerationPath;
        let applicationPath = projectGenerationPath + '/src/app';
        var screenName = screenData.screenName;
        if (formData.components !== undefined) {
            formData.components.forEach(component => {
                if (component.classes !== undefined) {
                    component.cssClassName = '';
                    component.classes.forEach(classData => {
                        component.cssClassName += `${classData.name} `;
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
                                let childComponentClassDataObject = childComponentClassData;
                                childComponentData.cssClass += `${childComponentClassData.name} `;
                            })
                        }
                    });
                }
                if (component.attributes !== undefined) {
                    let componentAttributes = component.attributes;
                }
            });
        }

        var fileData = {
            components: formData.components
        }

        let templatePath = path.resolve(__dirname, './template');
        let filePath = templatePath + `/${formData.tagName}.handlebars`;
        let screenGenerationPath = applicationPath + `/${screenName}`
        let result: any = await this.handleBarsFile(filePath, fileData, screenGenerationPath, screenName);
        callback(result);
    }


    handleBarsFile(filePath, fileData, screenGenerationPath, screenName) {
        return new Promise(resolve => {
            fs.readFile(filePath, 'utf-8', (err, data) => {
                var source = data;
                Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
                    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
                });
                var template = Handlebars.compile(source);
                var result = template(fileData);
                Common.createFolders(screenGenerationPath);
                fs.writeFile(screenGenerationPath + `/${screenName}.component.html`, result, (response) => {
                    resolve(response);
                })
            });
        })
    }
}