import * as util from 'util';
import { ComponentSupportWorker } from '../supportworker/componentSupportWorker';
import { AssetWorker } from './assetWorker';
import { templateScreen } from '../assets/headerComponent';
import { Constant } from '../config/Constant';

let componentSupportWorker = new ComponentSupportWorker();
let assetWorker = new AssetWorker();
export class ComponentWorker {



    public createHeaderComponent(generationPath, templatePath, templateHeaderObj, callback) {
        const temp = {
            folderName: Constant.HEADER_FOLDERNAME,
            importDependency: [],
            tagArray: templateHeaderObj.tag,
            scriptVariable: [],
            componentOnInit: [],
            componentMethod: [],
            imports: [],
            declarations: [],
            exports: [],
            css: []
        }
        let tempDependency = {
            dependencyname: '',
            dependencyPath: ''
        }
        tempDependency.dependencyname = 'Component, OnInit, Inject',
            tempDependency.dependencyPath = '@angular/core';
        temp.importDependency.push(tempDependency);
        if (templateHeaderObj.css.length > 0) {
            temp.css = templateHeaderObj.css;
        }
        if (templateHeaderObj.component &&
            templateHeaderObj.component.scriptVariable.length > 0) {
            temp.scriptVariable = templateHeaderObj.component.scriptVariable;
        }
        if (templateHeaderObj.component &&
            templateHeaderObj.component.componentOnInit.length > 0) {
            temp.componentOnInit = templateHeaderObj.component.componentOnInit;
        }
        assetWorker.checkAssetFile(templateHeaderObj.tag.join(''), generationPath, templatePath);
        return componentSupportWorker.generateHtmlComponent(generationPath, templatePath,
            Constant.COMPONENT_HTML_TEMPLATE_NAME, temp, (response) => {
                return componentSupportWorker.generateTsComponent(generationPath, templatePath,
                    Constant.COMPONENT_TS_TEMPLATE_NAME, temp, (response) => {
                        return componentSupportWorker.generateSpecComponent(generationPath, templatePath,
                            Constant.COMPONENT_SPEC_TEMPLATE_NAME, temp, (response) => {
                                return componentSupportWorker.generateCssComponent(generationPath, templatePath,
                                    Constant.COMPONENT_SCSS_TEMPLATE_NAME, temp, (response) => {
                                        const tempModule = {
                                            isExport: true,
                                            defaultDependency: [{
                                                name: 'RouterModule',
                                                path: '@angular/router'
                                            }]
                                        }
                                        this.setComponentModule(temp, tempModule);
                                        return componentSupportWorker.generateComponentModule(generationPath, templatePath,
                                            Constant.COMPONENT_MODULE_TEMPLATE_NAME, temp, false, (response) => {
                                                callback('header component generated');
                                            })
                                    })
                            })
                    })
            })
    }

    public setComponentModule(temp, tempModule) {
        temp.importDependency = [];
        const className = temp.folderName.charAt(0).toUpperCase() + temp.folderName.slice(1).toLowerCase();
        temp.importDependency.push({ dependencyname: 'NgModule', dependencyPath: '@angular/core' });
        temp.importDependency.push({ dependencyname: 'CommonModule', dependencyPath: '@angular/common' });
        temp.importDependency.push({ dependencyname: 'I18NextModule', dependencyPath: 'angular-i18next' });
        temp.importDependency.push({ dependencyname: `${className}Component`, dependencyPath: `./${temp.folderName}.component` });

        temp.imports.push(`CommonModule`);
        temp.imports.push(`I18NextModule.forRoot()`);
        temp.declarations.push(`${className}Component`);
        if (tempModule.isExport) {
            temp.exports.push(`${className}Component`);
        }
        if (tempModule.defaultDependency) {
            tempModule.defaultDependency.forEach(element => {
                let obj = {
                    dependencyname: '',
                    dependencyPath: ''
                }
                obj.dependencyname = element.name;
                obj.dependencyPath = element.path;
                temp.importDependency.push(obj);
                temp.imports.push(element.name);
            })
        }
    }

    public createFooterComponent(generationPath, templatePath, templateFooterObj, callback) {
        const temp = {
            folderName: Constant.FOOTER_FOLDERNAME,
            importDependency: [],
            scriptVariable: [],
            componentOnInit: [],
            componentMethod: [],
            imports: [],
            declarations: [],
            exports: [],
            tagArray: templateFooterObj.tag,
            css: []
        }
        let tempDependency = {
            dependencyname: '',
            dependencyPath: ''
        }
        tempDependency.dependencyname = 'Component, OnInit',
            tempDependency.dependencyPath = '@angular/core';
        temp.importDependency.push(tempDependency);
        if (templateFooterObj.css.length > 0) {
            temp.css = templateFooterObj.css;
        }
        assetWorker.checkAssetFile(templateFooterObj.tag.join(''), generationPath, templatePath);
        return componentSupportWorker.generateHtmlComponent(generationPath, templatePath,
            Constant.COMPONENT_HTML_TEMPLATE_NAME, temp, (response) => {
                return componentSupportWorker.generateTsComponent(generationPath, templatePath,
                    Constant.COMPONENT_TS_TEMPLATE_NAME, temp, (response) => {
                        return componentSupportWorker.generateSpecComponent(generationPath, templatePath,
                            Constant.COMPONENT_SPEC_TEMPLATE_NAME, temp, (response) => {
                                return componentSupportWorker.generateCssComponent(generationPath, templatePath,
                                    Constant.COMPONENT_SCSS_TEMPLATE_NAME, temp, (response) => {
                                        const tempModule = {
                                            isExport: true,
                                            defaultDependency: null
                                        }
                                        this.setComponentModule(temp, tempModule);
                                        return componentSupportWorker.generateComponentModule(generationPath, templatePath,
                                            Constant.COMPONENT_MODULE_TEMPLATE_NAME, temp, false, (response) => {
                                                callback('footer component generated');
                                            })
                                    })
                            })
                    })
            })
    }

    public createTemplateComponent(generationPath, templatePath, templateMainObj, callback) {
        const temp = {
            folderName: Constant.TEMPLATE_FOLDERNAME,
            importDependency: [],
            scriptVariable: [],
            componentOnInit: [],
            componentMethod: [],
            tagArray: templateMainObj.tag,
            imports: [],
            declarations: [],
            css: []
        }
        let tempDependency = {
            dependencyname: '',
            dependencyPath: ''
        }
        if (templateMainObj.css.length > 0) {
            temp.css = templateMainObj.css;
        }
        assetWorker.checkAssetFile(templateMainObj.tag.join(''), generationPath, templatePath);
        tempDependency.dependencyname = 'Component, OnInit',
            tempDependency.dependencyPath = '@angular/core';
        temp.importDependency.push(tempDependency);
        return componentSupportWorker.generateHtmlComponent(generationPath, templatePath,
            Constant.COMPONENT_HTML_TEMPLATE_NAME, temp, (response) => {
                return componentSupportWorker.generateTsComponent(generationPath, templatePath,
                    Constant.COMPONENT_TS_TEMPLATE_NAME, temp, (response) => {

                        return componentSupportWorker.generateSpecComponent(generationPath, templatePath,
                            Constant.COMPONENT_SPEC_TEMPLATE_NAME, temp, (response) => {
                                return componentSupportWorker.generateCssComponent(generationPath, templatePath,
                                    Constant.COMPONENT_SCSS_TEMPLATE_NAME, temp, (response) => {
                                        const tempModule = {
                                            isExport: false,
                                            defaultDependency: null
                                        }
                                        this.setComponentModule(temp, tempModule);
                                        return componentSupportWorker.generateComponentModule(generationPath, templatePath,
                                            Constant.COMPONENT_MODULE_TEMPLATE_NAME, temp, false, (response) => {
                                                callback('template component generated');
                                            })
                                    })
                            })
                    })
            })
    }



    public generateAppComponentHtml(generationPath, templatePath, templateName, callback) {
        const temp = {
            folderName: Constant.APP_FOLDERNAME,
            scriptVariable: [],
            componentOnInit: [],
            componentMethod: [],
            tagArray: []
        }
        // app html 
        temp.tagArray.push({ name: `app-${Constant.HEADER_FOLDERNAME}`, isHeaderFooter: true, isRouter: false });
        temp.tagArray.push({ name: `router-outlet`, isHeaderFooter: false, isRouter: false });
        temp.tagArray.push({ name: `app-${Constant.FOOTER_FOLDERNAME}`, isHeaderFooter: true, isRouter: false });
        // app css 
        console.log('app css template name are ----  ', templateName);
        // const findTemplate = templateScreen.find(x => x.name == templateName);
        // console.log('findedtemplate are --- ----  ', findTemplate);
        // let constructCSS = [];
        // if (findTemplate) {
        //     findTemplate.styles.forEach(styleElement => {
        //         constructCSS.push(`${styleElement.name} {`);
        //         styleElement.css.forEach(cssElement => {
        //             constructCSS.push(`${cssElement.cssName}: ${cssElement.cssValue};`);
        //         })
        //         constructCSS.push(`}`);
        //         constructCSS.push();
        //     })
        // } else {
        //     // need to add the default css in app components
        // }

        return componentSupportWorker.generateAppComponentHtml(generationPath, templatePath,
            Constant.APP_HTML_TEMPLATE_NAME, temp, (response) => {
                const tempInfo = {
                    folderName: Constant.APP_FOLDERNAME
                }
                return componentSupportWorker.generateAppComponentTs(generationPath, templatePath,
                    Constant.APP_COMPONENT_TEMPLATE_NAME, tempInfo, (response) => {
                        const tempStyle = {
                            folderName: Constant.APP_FOLDERNAME,
                            css: []
                        }
                        console.log('temp style are -----   ', tempStyle);
                        return componentSupportWorker.generateAppComponentSCSS(generationPath, templatePath,
                            Constant.COMPONENT_SCSS_TEMPLATE_NAME, tempStyle, (response) => {
                                callback('app component html file are generated');
                            })
                    })
            })

    }

    public generateMainModule(generationPath, templatePath, callback) {
        const temp = {
            folderName: Constant.APP_FOLDERNAME,
            declarations: [],
            importDependency: [],
            scriptVariable: [],
            componentOnInit: [],
            componentMethod: [],
            imports: [],
            providers: [],
            bootstrap: []
        }
        temp.declarations.push(`${Constant.APP_FOLDERNAME.charAt(0).toUpperCase() + Constant.APP_FOLDERNAME.slice(1).toLowerCase()}Component`);
        temp.importDependency.push({ dependencyname: 'BrowserModule', dependencyPath: '@angular/platform-browser' });
        temp.importDependency.push({ dependencyname: 'BrowserAnimationsModule', dependencyPath: '@angular/platform-browser/animations' });
        temp.importDependency.push({ dependencyname: 'NgModule', dependencyPath: '@angular/core' });
        temp.importDependency.push({ dependencyname: 'AppRoutingModule', dependencyPath: './app-routing.module' });
        temp.importDependency.push({ dependencyname: 'TranslatorModule', dependencyPath: './translator/translator.module' });
        temp.imports.push(`BrowserModule`, `AppRoutingModule`, `TranslatorModule`, `BrowserAnimationsModule`);
        temp.bootstrap.push(`${Constant.APP_FOLDERNAME.charAt(0).toUpperCase() + Constant.APP_FOLDERNAME.slice(1).toLowerCase()}Component`);
        console.log('generate main module in componentworker are -------   ', temp);
        componentSupportWorker.generateComponentModule(generationPath, templatePath,
            Constant.MAIN_MODULE_TEMPLATE_NAME, temp, true, (response) => {
                callback('main module file is generated');
            })
    }


}