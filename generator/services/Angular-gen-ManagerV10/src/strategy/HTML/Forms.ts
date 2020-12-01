import * as Handlebars  from 'handlebars';
import * as fs from 'fs';
import { response } from 'express';
import { couldStartTrivia } from 'typescript';
import * as path from 'path';
import { Common } from '../../config/Common';

export class Forms {
    formHTMLGeneration(formData, screenData, details) {
        let stylesData = JSON.parse(screenData['gjs-styles']);
        let projectGenerationPath = details.projectGenerationPath;
        let applicationPath = projectGenerationPath + '/src/app';
        let screenName = screenData.screenName;
        console.log('form data =================+>>>', formData);
        if (formData.components !== undefined) {
            formData.components.forEach(component => {
                if (component.classes !== undefined) {
                    component.classes.forEach(classData => {
                        // console.log('class data for the component===============>>', classData);
                    })
                }
                if (component.components !== undefined) {
                    component.components.forEach((childComponentData, index) => {
                        if (childComponentData.classes !== undefined) {
                            childComponentData.classes.forEach((childComponentClassData, index) => {
                                let childComponentClassDataObject = childComponentClassData;
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
            inputname1: "Name",
            inputname2: "Email",
            buttonName: "Create"
        }

        let templatePath = path.resolve(__dirname, '../../../template');
        let filePath = templatePath + '/example.handlebars';
        fs.readFile(filePath, 'utf-8', (err, data)=>{
            var source = data;
            var template = Handlebars.compile(source);
            var result = template(formData);
            console.log('result ===================>>>>', result);
            let screenGenerationPath = applicationPath + `/${screenName}`;
            Common.createFolders(screenGenerationPath);
            fs.writeFile(screenGenerationPath + `/${screenName}.component.html`, result, function (err) {
                if (err) throw err;
                console.log('successfully generated');
            });
          
        });

    }
}