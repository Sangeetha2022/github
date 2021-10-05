import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { Common } from '../../config/Common';
import { Constant } from '../../config/Constant';

export class Label {
    async labelHTMLGeneration(labelData, screenData, details, callback) {
        var stylesData = JSON.parse(screenData['gjs-styles']);
        var screenEntityDetails = screenData.entity_info;
        var overAllEntities = details.entities;
        var screenFlowDetails = screenData.flows_info;
        let projectGenerationPath = details.projectGenerationPath;
        let applicationPath = projectGenerationPath + '/src/app';
        var screenName = screenData.screenName;
        //Mapping the classes
        labelData.cssClassName = '';
        if(labelData.classes !== undefined) {
            labelData.classes.forEach((classObject, index) => {
                if (classObject.name !== undefined) {
                    labelData.cssClassName += `${classObject.name}`;
                    if (labelData.classes.length - 1 == index) {
                    } else {
                        labelData.cssClassName += ` `;
                    }
                }
            })
        }
        if(labelData.components !== undefined) {
            labelData.components.forEach(component => {
                
            });
        }


        let templatePath = path.resolve(__dirname, './template');

        let filePath = templatePath + `/Label.handlebars`;
        let screenGenerationPath = applicationPath + `/${screenName}`
        let result: any = await this.handleBarsFile(filePath, labelData, screenGenerationPath, screenName);
        console.log('labelData =============>>', labelData);
        console.log('result =================>>>', result);
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
