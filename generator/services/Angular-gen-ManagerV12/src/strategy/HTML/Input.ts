import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import { response } from 'express';
import { couldStartTrivia } from 'typescript';
import * as path from 'path';
import { Common } from '../../config/Common';

export class InputTagGeneration {
    async inputGeneration(inputdata, screenData, details, callback) {
        var stylesData = JSON.parse(screenData['gjs-styles']);
        var screenEntityDetails = screenData.entity_info;
        var overAllEntities = details.entities;
        var screenFlowDetails = screenData.flows_info;
        let projectGenerationPath = details.projectGenerationPath;
        let applicationPath = projectGenerationPath + '/src/app';
        var screenName = screenData.screenName;
        if (inputdata.classes !== undefined) {
            inputdata.cssClassName = '';
            inputdata.classes.forEach(component => {
                if (component.name !== undefined) {
                        inputdata.cssClassName += `${component.name} `;
                    
                }
                if (inputdata.name !== undefined) {
                   
                       
                            screenEntityDetails.forEach(async (entityField: any) => {
                                if (inputdata.name === entityField.elementName) {
                                    overAllEntities.forEach((entity: any) => {
                                        if (entityField.entityId === entity._id) {
                                            entityField.entityName = entity.name;
                                            inputdata.attributes.entityDetails = entityField;
                                        }
                                    })
                                }
                            })
                       
                        screenFlowDetails.forEach((flow: any) => {
                            if (inputdata.name === flow.elementName) {
                                inputdata.flowDetails = flow;
                            }
                        })
                       
                  
                }
                if (component.attributes !== undefined) {
                    let componentAttributes = component.attributes;
                }
            });
        }

        var fileData = {
            components: inputdata
        }

        let templatePath = path.resolve(__dirname, './template');
        let filePath = templatePath + `/input.handlebars`;
       // console.log(inputdata.tagName);
        let screenGenerationPath = applicationPath + `/${screenName}`
      //  console.log(fileData);
        let result: any = await this.handleBarsFile(filePath, fileData, screenGenerationPath, screenName);
        console.log(result);
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
                //console.log(template);
                var result = template(fileData);
               // console.log(result);
                resolve(result);
                // Common.createFolders(screenGenerationPath);
                // fs.writeFile(screenGenerationPath + `/${screenName}.component.html`, result, (response) => {
                //     resolve(response);
                // })
            });
        })
    }
}