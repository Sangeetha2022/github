import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import { response } from 'express';
import { couldStartTrivia } from 'typescript';
import * as path from 'path';
import { Common } from '../../config/Common';
import * as Constant from '../../config/Constant'
export class Select {
    async SelectGeneration(selectdata, screenData, details, callback) {
        var stylesData = JSON.parse(screenData['gjs-styles']);
        var screenEntityDetails = screenData.entity_info;
        var overAllEntities = details.entities;
        var screenFlowDetails = screenData.flows_info;
        let projectGenerationPath = details.projectGenerationPath;
        let applicationPath = projectGenerationPath + '/src/app';
        let optionstag= Constant.Constant.SELECT_OPTION_TAG; 
        selectdata.optionstag=optionstag;
        var screenName = screenData.screenName;
        if (selectdata.classes !== undefined) {
            selectdata.cssClassName = '';
            selectdata.classes.forEach(component => {
                if (component.name !== undefined) {
                        selectdata.cssClassName += `${component.name} `;
                    
                }
                if (selectdata.name !== undefined) {
                   
                       
                            screenEntityDetails.forEach(async (entityField: any) => {
                                if (selectdata.name === entityField.elementName) {
                                    overAllEntities.forEach((entity: any) => {
                                        if (entityField.entityId === entity._id) {
                                            entityField.entityName = entity.name;
                                            selectdata.attributes.entityDetails = entityField;
                                        }
                                    })
                                }
                            })
                       
                        screenFlowDetails.forEach((flow: any) => {
                            if (selectdata.name === flow.elementName) {
                                selectdata.flowDetails = flow;
                            }
                        })
                       
                  
                }
                if (component.attributes !== undefined) {
                    let componentAttributes = component.attributes;
                }
            });
        }

        var fileData = {
            components: selectdata
        }

        let templatePath = path.resolve(__dirname, './template');
        let filePath = templatePath + `/select.handlebars`;
       // console.log(inputdata.tagName);
        let screenGenerationPath = applicationPath + `/${screenName}`
      //  console.log(fileData);
        let result: any = await this.handleBarsFile(filePath, fileData, screenGenerationPath, screenName);
       // console.log(result);
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

    