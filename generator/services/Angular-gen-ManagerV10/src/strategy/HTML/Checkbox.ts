import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import { response } from 'express';
import { couldStartTrivia } from 'typescript';
import * as path from 'path';
import { Common } from '../../config/Common';


export class CheckBox {
    async checkboxGeneration(checkboxdata, screenData, details, callback) {
        var stylesData = JSON.parse(screenData['gjs-styles']);
        var screenEntityDetails = screenData.entity_info;
        var overAllEntities = details.entities;
        var screenFlowDetails = screenData.flows_info;
        let projectGenerationPath = details.projectGenerationPath;
        let applicationPath = projectGenerationPath + '/src/app';
        var screenName = screenData.screenName;
        checkboxdata.cssClassName = '';
        if (checkboxdata.classes !== undefined) {
            checkboxdata.classes.forEach(component => {
                if (component.name !== undefined) {
                    checkboxdata.cssClassName += `${component.name} `;
                
            }
            if (checkboxdata.name !== undefined) {
               
                   
                        screenEntityDetails.forEach(async (entityField: any) => {
                            if (checkboxdata.name === entityField.elementName) {
                                overAllEntities.forEach((entity: any) => {
                                    if (entityField.entityId === entity._id) {
                                        entityField.entityName = entity.name;
                                        checkboxdata.attributes.entityDetails = entityField;
                                    }
                                })
                            }
                        })
                   
                    screenFlowDetails.forEach((flow: any) => {
                        if (checkboxdata.name === flow.elementName) {
                            checkboxdata.flowDetails = flow;
                        }
                    })
                   
              
            }
            if (component.attributes !== undefined) {
                let componentAttributes = component.attributes;
            }
        });
    }

        var fileData = {
            components: checkboxdata
        }

        let templatePath = path.resolve(__dirname, './template');
        let filePath = templatePath + `/checkbox.handlebars`;
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
               // console.log('checkbox' + result);
                resolve(result);
                // Common.createFolders(screenGenerationPath);
                // fs.writeFile(screenGenerationPath + `/${screenName}.component.html`, result, (response) => {
                //     resolve(response);
                // })
            });
        })
    }
}