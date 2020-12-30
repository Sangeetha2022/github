import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import { response } from 'express';
import { couldStartTrivia } from 'typescript';
import * as path from 'path';
import { Common } from '../../config/Common';
import { Constant } from '../../config/Constant';

export class RadioButton {


    async radiobuttonHTMLGeneration(radiobuttonData, screenData, details, callback) {
        var stylesData = JSON.parse(screenData['gjs-styles']);
        var screenEntityDetails = screenData.entity_info;
        var overAllEntities = details.entities;
        var screenFlowDetails = screenData.flows_info;
        let projectGenerationPath = details.projectGenerationPath;
        let applicationPath = projectGenerationPath + '/src/app';
        var screenName = screenData.screenName;

        //Mapping the classes
        if (radiobuttonData.classes !== undefined) {
            radiobuttonData.cssClassName = '';
            radiobuttonData.classes.forEach((component, index) => {
                if (component.name !== undefined) {
                    radiobuttonData.cssClassName += `${component.name} `;
                    if (radiobuttonData.classes.length - 1 == index) {
                    } else {
                        radiobuttonData.cssClassName += ` `;
                    }
                }

                //Mapping the entity details
                if (radiobuttonData.name !== undefined) {


                    screenEntityDetails.forEach(async (entityField: any) => {
                        if (radiobuttonData.name === entityField.elementName) {
                            overAllEntities.forEach((entity: any) => {
                                if (entityField.entityId === entity._id) {
                                    entityField.entityName = entity.name;
                                    radiobuttonData.attributes.entityDetails = entityField;
                                    radiobuttonData.standalone = Constant.STANDALONE;
                                }
                            })
                        }
                    })

                    screenFlowDetails.forEach((flow: any) => {
                        if (radiobuttonData.name === flow.elementName) {
                            radiobuttonData.flowDetails = flow;
                        }
                    })
                }


                if (component.attributes !== undefined) {
                    let componentAttributes = component.attributes;
                }
            });
        }

        var fileData = {
            radiobuttonData: radiobuttonData
        }

        let templatePath = path.resolve(__dirname, './template');

        let filePath = templatePath + `/radiobutton.handlebars`;
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

                resolve(result);
            });
        })
    }
} 
