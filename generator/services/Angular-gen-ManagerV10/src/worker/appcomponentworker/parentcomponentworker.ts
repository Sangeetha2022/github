import * as fs from 'fs';
import { Constant } from '../../assets/Constant';
// import { DependencySupportWorker } from '../supportworker/dependencySupportWorker';

export class ParentComponentWorker {
    // private dependencySupportWorker = new DependencySupportWorker();
    // private routeModule = {
    //     importDependency: [],
    //     routePath: []
    // }
    // private appModule = {
    //     importDependency: [],
    //     declarations: [],
    //     imports: [],
    //     providers: [],
    //     bootstrap: []
    // }

    // private angularJsonData = []
    // private configAppModule = [];

    // // private packageModule = [`"angular-i18next": "^5.0.6" ,`, `"angular-validation-message": "^1.1.0",`, `"angular-validation-message-i18next": "^1.1.0",`];
    // private packageModule = [
    //     `"angular-i18next": "^5.0.6"`,
    //     `"angular-validation-message": "^1.1.0"`,
    //     `"i18next": "^14.0.1"`,
    //     `"i18next-browser-languagedetector": "^2.2.4"`,
    //     `"i18next-sprintf-postprocessor": "^0.2.2"`,
    //     ` "i18next-xhr-backend": "^1.5.1"`,
    //     `"@ng-select/ng-select": "^5.0.3",`,
    // ]

    // private moduleComponent = {
    //     importDependency: [],
    //     imports: [],
    //     declarations: [],
    //     exports: []
    // }

    // initializeRouteModule() {
    //     this.routeModule = {
    //         importDependency: [],
    //         routePath: []
    //     }
    // }
    // initializeAppModule() {
    //     this.appModule = {
    //         importDependency: [],
    //         declarations: [],
    //         imports: [],
    //         providers: [],
    //         bootstrap: []
    //     }
    // }
    // initializePackageModule() {
    //     this.packageModule = [];
    // }

    // initializeOtherInfo() {
    //     this.moduleComponent = {
    //         importDependency: [],
    //         imports: [],
    //         declarations: [],
    //         exports: []
    //     }
    // }
    // public modifyDependency(packagePath, srcPath, applicationPath, globalStyle, microFlows, callback) {

    //     //toaster implemented angular.json and package.json files
    //     if (microFlows.length > 0) {
    //         microFlows.map(data => {
    //             if (data.actionOnData == 'GpCreate' || data.actionOnData == 'GpUpdate') {
    //                 this.angularJsonData = [];
    //                 this.packageModule.push(`"ngx-toastr": "^10.1.0",`)
    //                 this.angularJsonData.push('node_modules/ngx-toastr/toastr.css')
    //                 dependencyWorker.modifyAngularJsonFile(packagePath, this.angularJsonData)
    //             }
    //         })
    //     }

    //     if (this.routeModule.routePath.length > 0) {
    //         this.modifyAppRouteFile(applicationPath, this.routeModule);
    //         this.initializeRouteModule();
    //     }
    //     if (this.appModule.importDependency.length > 0) {
    //         this.modifyAppModuleFile(applicationPath, this.appModule);
    //         this.initializeAppModule();
    //     }
    //     // if (this.packageModule.length > 0) {
    //     this.configAppModule.push(`    "module": "esnext",`);
    //     console.log(`package json -------`, this.packageModule)
    //     this.modifyPackageFile(packagePath, this.packageModule);
    //     // dependencyWorker.modifyConfigAppJSONFile(packagePath, this.configAppModule);
    //     this.initializePackageModule();
    //     // }
    //     if (globalStyle.import.length > 0 || globalStyle.others.length > 0) {
    //         this.modifyGlobalStyles(srcPath, globalStyle);
    //         this.initializeOtherInfo();
    //     }
    //     // modify proxy file
    //     this.modifyProxyFile(packagePath);
    //     callback();
    // }

    // public modifyAppRouteFile(applicationPath, information) {
    //     const file = this.dependencySupportWorker.readFile(applicationPath, Constant.APP_ROUTING_FILENAME);
    //     const importIndex = file.findIndex(x => /const.*routes\:\s+Routes/.test(x));
    //     const pathIndex = file.findIndex(x => /];/.test(x));
    //     if (information.importDependency.length > 0) {
    //         information.importDependency.forEach((dependencyElement, elementIndex) => {
    //             file.splice(importIndex - 1, 0, dependencyElement);
    //             file.splice(pathIndex + 1, 0, information.routePath[elementIndex]);
    //         })
    //     }
    //     this.dependencySupportWorker.writeStaticFile(applicationPath, Constant.APP_ROUTING_FILENAME,
    //         file.join(`\n`), (response) => { })
    // }

    // public modifyAppModuleFile(applicationPath, information) {
    //     const file = this.dependencySupportWorker.readFile(applicationPath, Constant.APP_MODULE_FILENAME);
    //     const moduleIndex = file.findIndex(x => /@NgModule/.test(x));
    //     if (information.importDependency.length > 0) {
    //         information.importDependency.forEach(dependencyElement => {
    //             file.splice(moduleIndex - 1, 0, dependencyElement);
    //         })
    //     }
    //     const declarationIndex = file.findIndex(x => /declarations/.test(x));
    //     if (information.declarations.length > 0) {
    //         information.declarations.forEach(declarationElement => {
    //             file.splice(declarationIndex + 1, 0, declarationElement);
    //         })
    //     }
    //     const importIndex = file.findIndex(x => /imports/.test(x));
    //     // if (information.imports.length > 0) {
    //     //     information.imports.forEach(importElement => {
    //     //         file.splice(importIndex + 1, 0, importElement);
    //     //     })
    //     // }
    //     const providerIndex = file.findIndex(x => /providers/.test(x));
    //     if (information.providers.length > 0) {
    //         information.providers.forEach(providerElement => {
    //             file.splice(providerIndex + 1, 0, providerElement);
    //         })
    //     }
    //     const bootstrapIndex = file.findIndex(x => /bootstrap/.test(x));
    //     if (information.bootstrap.length > 0) {
    //         information.bootstrap.forEach(boostrapElement => {
    //             file.splice(bootstrapIndex + 1, 0, boostrapElement);
    //         })
    //     }
    //     this.dependencySupportWorker.writeStaticFile(applicationPath, Constant.APP_MODULE_FILENAME,
    //         file.join(`\n`), (response) => { })
    // }

    // public modifyPackageFile(applicationPath, information) {
    //     const staticPackage = {

    //     }
    //     const file = this.dependencySupportWorker.readFile(applicationPath, Constant.PACKAGE_JSON_FILENAME);
    //     const index = file.findIndex(x => /router/.test(x));
    //     if (index) {
    //         information.forEach(element => {
    //             const splitted = element.split(":");
    //             const regExpression = new RegExp(splitted[0]);
    //             if (file.findIndex(x => regExpression.test(x)) < 0) {
    //                 file.splice(index, 0, element);
    //             }

    //         })
    //     }
    //     this.dependencySupportWorker.writeStaticFile(applicationPath, Constant.PACKAGE_JSON_FILENAME,
    //         file.join(`\n`), (response) => { })
    // }

    // // style.scss file
    // public modifyGlobalStyles(applicationPath, information) {
    //     let file = this.dependencySupportWorker.readFile(applicationPath, Constant.STYLE_SCSS_FILENAME);
    //     if (information.import.length > 0) {
    //         file.splice(1, 0, information.import.join('\n'));
    //     }
    //     if (information.others.length > 0) {
    //         file = file.concat(information.others);
    //     }
    //     this.dependencySupportWorker.writeStaticFile(applicationPath, Constant.STYLE_SCSS_FILENAME,
    //         file.join(`\n`), (response) => { })
    // }

    // modifyProxyFile(applicationPath) {
    //     const nginxPath = `${applicationPath}/${Constant.NGINX_FOLDERNAME}`;
    //     // modify proxy file
    //     console.log('proxy array value are --- ', this.proxyArray);
    //     this.proxySupportWorker.modifyFileInfo(applicationPath, this.proxyArray,
    //         Constant.PROXY_CONFIG_VARIABLENAME, Constant.PROXY_CONFIG_FILENAME);
    //     this.proxyArray = [];
    //     // modify nginx file
    //     console.log('nginx array value are --- ', this.nginxArray);
    //     this.proxySupportWorker.modifyFileInfo(nginxPath, this.nginxArray,
    //         null, Constant.NGINX_FILENAME);
    //     this.nginxArray = [];
    // }

    // public modifyAngularJsonFile(applicationPath, information) {
    //     const file = this.dependencySupportWorker.readFile(applicationPath, Constant.ANGULAR_JSON_FILE)
    //     const styleIndex = file.findIndex(x => /styles/.test(x))
    //     if (styleIndex != -1) {
    //         if (!file[styleIndex + 1].includes(`${information}`)) {
    //             file.splice(styleIndex + 1, 0, `"${information}", `)
    //         }
    //         this.dependencySupportWorker.writeStaticFile(applicationPath, Constant.ANGULAR_JSON_FILE,
    //             file.join(`\n`), (response) => {
    //                 console.log("Response----write00---file---", response)
    //             })
    //     }


    // }

    // public modifyConfigAppJSONFile(applicationPath, information) {
    //     const staticPackage = {

    //     }
    //     const file = this.dependencySupportWorker.readFile(applicationPath, Constant.TS_CONFIG_APP_JSON_FILE);
    //     const index = file.findIndex(x => /compilerOptions/.test(x));
    //     if (index) {
    //         information.forEach(element => {
    //             const splitted = element.split(":");
    //             const regExpression = new RegExp(splitted[0]);
    //             if (file.findIndex(x => regExpression.test(x)) < 0) {
    //                 file.splice(index + 2, 0, element);
    //             }

    //         })
    //     }
    //     this.dependencySupportWorker.writeStaticFile(applicationPath, Constant.TS_CONFIG_APP_JSON_FILE,
    //         file.join(`\n`), (response) => { })
    // }

}