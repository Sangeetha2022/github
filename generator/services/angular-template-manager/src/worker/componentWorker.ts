import * as util from 'util';
import { ComponentSupportWorker } from '../supportworker/componentSupportWorker';
import { AssetWorker } from './assetWorker';

let componentSupportWorker = new ComponentSupportWorker();
let assetWorker = new AssetWorker();
export class ComponentWorker {
    private COMPONENT_HTML_TEMPLATE_NAME: String = 'component_html';
    private COMPONENT_TS_TEMPLATE_NAME: String = 'component_ts';
    private COMPONENT_SPEC_TEMPLATE_NAME: String = 'component_spec';
    private COMPONENT_SCSS_TEMPLATE_NAME: String = 'component_scss';
    private COMPONENT_MODULE_TEMPLATE_NAME: String = 'component_module';
    private MAIN_MODULE_TEMPLATE_NAME: String = 'app_module';
    private APP_HTML_TEMPLATE_NAME: String = 'app_html';
    private APP_COMPONENT_TEMPLATE_NAME: String = 'app_component';
    private APP_FOLDERNAME = 'app';
    private HEADER_FOLDERNAME = 'header';
    public TEMPLATE_FOLDERNAME = 'template';
    private FOOTER_FOLDERNAME = 'footer';


    public createHeaderComponent(generationPath, templatePath, templateHeaderObj, callback) {
        const temp = {
            folderName: this.HEADER_FOLDERNAME,
            importDependency: [],
            tagArray: templateHeaderObj.tag,
            imports: [],
            declarations: [],
            exports: [],
            css: []
        }
        let tempDependency = {
            dependencyname: '',
            dependencyPath: ''
        }
        tempDependency.dependencyname = 'Component, OnInit',
            tempDependency.dependencyPath = '@angular/core';
        temp.importDependency.push(tempDependency);
        if (templateHeaderObj.css.length > 0) {
            temp.css = templateHeaderObj.css;
        }
        assetWorker.checkAssetFile(templateHeaderObj.tag.join(''), generationPath, templatePath);
        return componentSupportWorker.generateHtmlComponent(generationPath, templatePath,
            this.COMPONENT_HTML_TEMPLATE_NAME, temp, (response) => {
                return componentSupportWorker.generateTsComponent(generationPath, templatePath,
                    this.COMPONENT_TS_TEMPLATE_NAME, temp, (response) => {
                        return componentSupportWorker.generateSpecComponent(generationPath, templatePath,
                            this.COMPONENT_SPEC_TEMPLATE_NAME, temp, (response) => {
                                return componentSupportWorker.generateCssComponent(generationPath, templatePath,
                                    this.COMPONENT_SCSS_TEMPLATE_NAME, temp, (response) => {
                                        const tempModule = {
                                            isExport: true,
                                            defaultDependency: [{
                                                name: 'RouterModule',
                                                path: '@angular/router'
                                            }]
                                        }
                                        this.setComponentModule(temp, tempModule);
                                        return componentSupportWorker.generateComponentModule(generationPath, templatePath,
                                            this.COMPONENT_MODULE_TEMPLATE_NAME, temp, false, (response) => {
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
        temp.importDependency.push({ dependencyname: `${className}Component`, dependencyPath: `./${temp.folderName}.component` });

        temp.imports.push(`CommonModule`);
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
            folderName: this.FOOTER_FOLDERNAME,
            importDependency: [],
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
            this.COMPONENT_HTML_TEMPLATE_NAME, temp, (response) => {
                return componentSupportWorker.generateTsComponent(generationPath, templatePath,
                    this.COMPONENT_TS_TEMPLATE_NAME, temp, (response) => {
                        return componentSupportWorker.generateSpecComponent(generationPath, templatePath,
                            this.COMPONENT_SPEC_TEMPLATE_NAME, temp, (response) => {
                                return componentSupportWorker.generateCssComponent(generationPath, templatePath,
                                    this.COMPONENT_SCSS_TEMPLATE_NAME, temp, (response) => {
                                        const tempModule = {
                                            isExport: true,
                                            defaultDependency: null
                                        }
                                        this.setComponentModule(temp, tempModule);
                                        return componentSupportWorker.generateComponentModule(generationPath, templatePath,
                                            this.COMPONENT_MODULE_TEMPLATE_NAME, temp, false, (response) => {
                                                callback('footer component generated');
                                            })
                                    })
                            })
                    })
            })
    }

    public createTemplateComponent(generationPath, templatePath, templateMainObj, callback) {
        const temp = {
            folderName: this.TEMPLATE_FOLDERNAME,
            importDependency: [],
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
            this.COMPONENT_HTML_TEMPLATE_NAME, temp, (response) => {
                return componentSupportWorker.generateTsComponent(generationPath, templatePath,
                    this.COMPONENT_TS_TEMPLATE_NAME, temp, (response) => {

                        return componentSupportWorker.generateSpecComponent(generationPath, templatePath,
                            this.COMPONENT_SPEC_TEMPLATE_NAME, temp, (response) => {
                                return componentSupportWorker.generateCssComponent(generationPath, templatePath,
                                    this.COMPONENT_SCSS_TEMPLATE_NAME, temp, (response) => {
                                        const tempModule = {
                                            isExport: false,
                                            defaultDependency: null
                                        }
                                        this.setComponentModule(temp, tempModule);
                                        return componentSupportWorker.generateComponentModule(generationPath, templatePath,
                                            this.COMPONENT_MODULE_TEMPLATE_NAME, temp, false, (response) => {
                                                callback('template component generated');
                                            })
                                    })
                            })
                    })
            })
    }



    public generateAppComponentHtml(generationPath, templatePath, callback) {
        const temp = {
            folderName: this.APP_FOLDERNAME,
            tagArray: []
        }
        temp.tagArray.push({ name: `app-${this.HEADER_FOLDERNAME}`, isHeaderFooter: true });
        temp.tagArray.push({ name: `router-outlet`, isHeaderFooter: false });
        temp.tagArray.push({ name: `app-${this.FOOTER_FOLDERNAME}`, isHeaderFooter: true });
        return componentSupportWorker.generateAppComponentHtml(generationPath, templatePath,
            this.APP_HTML_TEMPLATE_NAME, temp, (response) => {
                const tempInfo = {
                    folderName: this.APP_FOLDERNAME
                }
                return componentSupportWorker.generateAppComponentTs(generationPath, templatePath,
                    this.APP_COMPONENT_TEMPLATE_NAME, tempInfo, (response) => {
                        callback('app component html file are generated');
                    })
            })

    }

    public generateMainModule(generationPath, templatePath, callback) {
        const temp = {
            folderName: this.APP_FOLDERNAME,
            declarations: [],
            importDependency: [],
            imports: [],
            providers: [],
            bootstrap: []
        }
        temp.declarations.push(`${this.APP_FOLDERNAME.charAt(0).toUpperCase() + this.APP_FOLDERNAME.slice(1).toLowerCase()}Component`);
        temp.importDependency.push({ dependencyname: 'BrowserModule', dependencyPath: '@angular/platform-browser' });
        temp.importDependency.push({ dependencyname: 'NgModule', dependencyPath: '@angular/core' });
        temp.importDependency.push({ dependencyname: 'AppRoutingModule', dependencyPath: './app-routing.module' });
        temp.imports.push(`BrowserModule`, `AppRoutingModule`);
        temp.bootstrap.push(`${this.APP_FOLDERNAME.charAt(0).toUpperCase() + this.APP_FOLDERNAME.slice(1).toLowerCase()}Component`);
        console.log('generate main module in componentworker are -------   ', temp);
        componentSupportWorker.generateComponentModule(generationPath, templatePath,
            this.MAIN_MODULE_TEMPLATE_NAME, temp, true, (response) => {
                callback('main module file is generated');
            })
    }


}