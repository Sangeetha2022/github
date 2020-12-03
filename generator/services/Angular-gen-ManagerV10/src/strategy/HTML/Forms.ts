import * as Handlebars  from 'handlebars';
import * as fs from 'fs';
import { response } from 'express';
import { couldStartTrivia } from 'typescript';
import * as path from 'path';
import { Common } from '../../config/Common';

export class Forms {
    formHTMLGeneration(formData, screenData, details) {
        var stylesData = JSON.parse(screenData['gjs-styles']);
        var screenEntityDetails = screenData.entity_info;
        var overAllEntities = details.entities;
        // console.log('details =========>>', details);
        // console.log('stylesData =======================>>>', screenData['gjs-styles']);
        // console.log('stylesData =======================>>>', screenData['gjs-css']);
        // console.log('Entity info =======================>>>', screenData.entity_info);
        let projectGenerationPath = details.projectGenerationPath;
        let applicationPath = projectGenerationPath + '/src/app';
        var screenName = screenData.screenName;
        // console.log('form data =================+>>>', formData);
        if (formData.components !== undefined) {
            formData.components.forEach(component => {
                // console.log('component data =================+>>>', component);
                if (component.classes !== undefined) {
                    component.cssClassName = '';
                    component.classes.forEach(classData => {
                        // console.log('class data for the component===============>>', classData);
                        component.cssClassName += `${classData.name} `;
                    })
                }
                if (component.components !== undefined) {
                    component.components.forEach((childComponentData, index) => {
                        // console.log('childComponentData =================+>>>', childComponentData);
                        if (childComponentData.name !== undefined) {
                            screenEntityDetails.forEach(async (entityField: any) => {
                                if(childComponentData.name === entityField.elementName) {
                                    overAllEntities.forEach((entity: any) => {
                                        if(entityField.entityId === entity._id) {
                                            entityField.entityName = entity.name;
                                            childComponentData.attributes.entityDetails = entityField;
                                        }
                                    })
                                }
                            })
                        }
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

        let templatePath = path.resolve(__dirname, '../../../template');
        let filePath = templatePath + '/example.handlebars';
        // console.log('after constructed object data ===============>>', fileData);
        fs.readFile(filePath, 'utf-8', (err, data)=>{
            var source = data;
            Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
                return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
            });
            var template = Handlebars.compile(source);
            var result = template(fileData);
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