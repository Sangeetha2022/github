import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import { response } from 'express';
import { couldStartTrivia } from 'typescript';
import * as path from 'path';
import { Common } from '../../config/Common';
import { component } from '../../assets/componentDependency';

export class Button {


    async buttonHTMLGeneration(buttonData, screenData, details, callback) {
        var stylesData = JSON.parse(screenData['gjs-styles']);
        var screenEntityDetails = screenData.entity_info;
        var overAllEntities = details.entities;
        var screenFlowDetails = screenData.flows_info;
        let projectGenerationPath = details.projectGenerationPath;
        let applicationPath = projectGenerationPath + '/src/app';
        var screenName = screenData.screenName;

        //Checking whether class is present or not
        if (buttonData.classes !== undefined) {
            buttonData.cssClassName = '';
            buttonData.classes.forEach((component, index) => {
                if (component.name !== undefined) {
                    buttonData.cssClassName += `${component.name}`;
                    if (buttonData.classes.length - 1 == index) {
                    } else {
                        buttonData.cssClassName += ` `;
                    }
                }

                //Mapping the flow details with field names for the button
                if (buttonData.name !== undefined) {
      

                    screenFlowDetails.forEach((flow: any) => {
                        if (buttonData.name === flow.elementName) {
                            buttonData.flowDetails = flow;
                        }
                    })
                }

            });
        }

        var fileData = {
            buttonData: buttonData
        }

        let templatePath = path.resolve(__dirname, './template');
        let filePath = templatePath + `/${buttonData.tagName}.handlebars`;
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
