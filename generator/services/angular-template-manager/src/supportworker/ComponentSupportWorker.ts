import * as path from 'path';
import * as fs from 'fs';
import * as st from 'stringtemplate-js';
import { Common } from '../config/Common';

export class ComponentSupportWorker {

    private appComponentModuleList: any[] = [];

    generateAppComponentHtml(generationPath, templatePath, templateName, information, callback) {
        const filePath = `${generationPath}/src/${information.folderName.toLowerCase()}`;
        templatePath = path.resolve(__dirname, templatePath);
        let generateComponent = st.loadGroup(require(templatePath + `/${templateName}_stg`));
        let componentFileData = generateComponent.render(templateName, [information.tagArray]);
        fs.writeFile(filePath + `/${information.folderName.toLowerCase()}.component.html`, componentFileData, function (err) {
            if (err) throw err;
            callback(`app.component.html file generated`);
        })

    }

    generateHtmlComponent(generationPath, templatePath, templateName, information, callback) {
        const className = information.folderName.charAt(0).toUpperCase() + information.folderName.slice(1).toLowerCase();
        const filePath = `${generationPath}/src/app/${information.folderName.toLowerCase()}`;
        templatePath = path.resolve(__dirname, templatePath);
        Common.createFolders(filePath);
        let generateComponent = st.loadGroup(require(templatePath + `/${templateName}_stg`));
        let componentFileData = generateComponent.render(templateName, [information.tagArray.join(`\n`)]);
        fs.writeFile(filePath + `/${information.folderName.toLowerCase()}.component.html`, componentFileData, function (err) {
            if (err) throw err;
            callback(`${className}.component.html file generated`);
        })

    }

    generateTsComponent(generationPath, templatePath, templateName, information, callback) {
        const className = information.folderName.charAt(0).toUpperCase() + information.folderName.slice(1).toLowerCase();
        const filePath = `${generationPath}/src/app/${information.folderName.toLowerCase()}`;
        templatePath = path.resolve(__dirname, templatePath);
        Common.createFolders(filePath);
        let generateComponent = st.loadGroup(require(templatePath + `/${templateName}_stg`));
        let componentFileData = generateComponent.render(templateName, [className, information.folderName, information.importDependency]);
        fs.writeFile(filePath + `/${information.folderName.toLowerCase()}.component.ts`, componentFileData, function (err) {
            if (err) throw err;
            callback(`${className}.component.ts file generated`);
        })

    }

    generateServicesComponent(generationPath, templatePath, templateName, information, callback) {
        const className = information.folderName.charAt(0).toUpperCase() + information.folderName.slice(1).toLowerCase();
        const filePath = `${generationPath}/src/app/${information.folderName.toLowerCase()}`;
        templatePath = path.resolve(__dirname, templatePath);
        Common.createFolders(filePath);
        let generateComponent = st.loadGroup(require(templatePath + `/${templateName}_stg`));
        let componentFileData = generateComponent.render(templateName, [information]);
        fs.writeFile(filePath + `/${information.folderName.toLowerCase()}.ts`, componentFileData, function (err) {
            if (err) throw err;
            callback(`${className}.service.ts file generated`);
        })

    }

    generateCssComponent(generationPath, templatePath, templateName, information, callback) {
        const className = information.folderName.charAt(0).toUpperCase() + information.folderName.slice(1).toLowerCase();
        const filePath = `${generationPath}/src/app/${information.folderName.toLowerCase()}`;
        templatePath = path.resolve(__dirname, templatePath);
        Common.createFolders(filePath);
        let generateComponent = st.loadGroup(require(templatePath + `/${templateName}_stg`));
        let componentFileData = generateComponent.render(templateName, [information.css.join(`\n`)]);
        fs.writeFile(filePath + `/${information.folderName.toLowerCase()}.component.scss`, componentFileData, function (err) {
            if (err) throw err;
            callback(`${className}.component.scss file generated`);
        })

    }


    generateSpecComponent(generationPath, templatePath, templateName, information, callback) {
        const className = information.folderName.charAt(0).toUpperCase() + information.folderName.slice(1).toLowerCase();
        const filePath = `${generationPath}/src/app/${information.folderName.toLowerCase()}`;
        templatePath = path.resolve(__dirname, templatePath);
        Common.createFolders(filePath);
        let generateComponent = st.loadGroup(require(templatePath + `/${templateName}_stg`));
        let componentFileData = generateComponent.render(templateName, [className, information.folderName]);
        fs.writeFile(filePath + `/${information.folderName.toLowerCase()}.component.spec.ts`, componentFileData, function (err) {
            if (err) throw err;
            callback(`${className}.component.spec.ts file generated`);
        })

    }

    generateComponentModule(generationPath, templatePath, templateName, information, isMainModule, callback) {
        const className = information.folderName.charAt(0).toUpperCase() + information.folderName.slice(1).toLowerCase();
        let filePath = ``;
        templatePath = path.resolve(__dirname, templatePath);
        // Common.createFolders(filePath);
        // adding component module className in appModule
        if (!isMainModule) {
            // this.appComponentModuleList.push(information.folderName);
            if (this.appComponentModuleList.findIndex(element => element == information.folderName) < 0) {
                this.appComponentModuleList.push(information.folderName)
            }
            filePath = `${generationPath}/src/app/${information.folderName.toLowerCase()}`;
            console.log(`generate component module of appComponentModuleList --${isMainModule}---->>>>   `, this.appComponentModuleList);
        } else {
            filePath = `${generationPath}/src/app`;
            console.log(`main Module information of temp appComponentModuleList ---${isMainModule}-- `, this.appComponentModuleList);
            information.importDependency.push({ dependencyname: `${className}Component`, dependencyPath: `./${information.folderName.toLowerCase()}.component` });
            this.appComponentModuleList.forEach(appElement => {
                let temp = {
                    dependencyname: '',
                    dependencyPath: ''
                }
                temp.dependencyname = `${appElement.charAt(0).toUpperCase()}${appElement.slice(1).toLowerCase()}Module`;
                temp.dependencyPath = `./${appElement}/${appElement}.module`;
                information.importDependency.push(temp);
                information.imports.push(temp.dependencyname);
            })
            information.providers = information.providers.join(',\n');
            information.bootstrap = information.bootstrap.join(',\n');
            if (information.exports) {
                information.exports = information.exports.join(',\n');
            }
            console.log(`generate component module of values for main --${isMainModule}---->>>>   `, information, ' ---isMainModule---  ', isMainModule);
        }
        Common.createFolders(filePath);
        information.className = className;
        information.imports = information.imports.join(',\n');
        information.declarations = information.declarations.join(',\n');
        let generateComponent = st.loadGroup(require(templatePath + `/${templateName}_stg`));
        let componentFileData = generateComponent.render(templateName, [information]);
        fs.writeFile(filePath + `/${information.folderName.toLowerCase()}.module.ts`, componentFileData, function (err) {
            if (err) throw err;
            callback(`${className}.module.ts file generated`);
        })

    }

    // generateAppModule(generationPath, templatePath, templateName, information, callback) {
    //     const className = information.folderName.charAt(0).toUpperCase() + information.folderName.slice(1).toLowerCase();
    //     const filePath = `${generationPath}/src/app/${information.folderName.toLowerCase()}`;
    //     templatePath = path.resolve(__dirname, templatePath);
    //     Common.createFolders(filePath);
    //     // adding component module className in appModule
    //     information.className = className;
    //     information.declarations = information.declarations.join(',\n');
    //     information.imports = information.imports.join(',\n');
    //     information.providers = information.providers.join(',\n');
    //     information.bootstrap = information.bootstrap.join(',\n');
    //     let generateComponent = st.loadGroup(require(templatePath + `/${templateName}_stg`));
    //     let componentFileData = generateComponent.render(templateName, [className, information]);
    //     fs.writeFile(filePath + `/${information.folderName.toLowerCase()}.module.ts`, componentFileData, function (err) {
    //         if (err) throw err;
    //         callback(`${className}.module.ts file generated`);
    //     })

    // }


}