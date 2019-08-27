import { ComponentSupportWorker } from "../supportworker/componentSupportWorker";
import { DependencyWorker } from "./dependencyWorker";
import { Constant } from "../config/Constant";
import * as util from 'util';
import { FlowComponentWorker } from "./flowComponentWorker";
import { FlowServiceWorker } from "./flowServiceWorker";
import * as componentDependency from '../assets/componentDependency';
import { ElementRouteWorker } from "./elementRouteWorker";

const componentSupportWorker = new ComponentSupportWorker();
const dependencyWorker = new DependencyWorker();
const flowComponentWorker = new FlowComponentWorker();
const flowServiceWorker = new FlowServiceWorker();
const elementRouteWorker = new ElementRouteWorker();

export class ComponentWorker {

    private routeModule = {
        importDependency: [],
        routePath: []
    }
    private appModule = {
        importDependency: [],
        declarations: [],
        imports: [],
        providers: [],
        bootstrap: []
    }

    private packageModule = [];

    private moduleComponent = {
        importDependency: [],
        imports: [],
        declarations: []
    }

    initializeRouteModule() {
        this.routeModule = {
            importDependency: [],
            routePath: []
        }
    }
    initializeAppModule() {
        this.appModule = {
            importDependency: [],
            declarations: [],
            imports: [],
            providers: [],
            bootstrap: []
        }
    }
    initializePackageModule() {
        this.packageModule = [];
    }

    initializeOtherInfo() {
        this.moduleComponent = {
            importDependency: [],
            imports: [],
            declarations: []
        }
    }

    public generateComponentHtml(applicationPath, templatePath, componentName, information, callback) {
        console.log('before set routeModule HTML ts are -routeModule--->>  ', this.routeModule);
        const temp = {
            folderName: componentName.toLowerCase(),
            className: componentName.charAt(0).toUpperCase() + componentName.slice(1).toLowerCase(),
            tag: information
        }
        componentSupportWorker.generateComponent(applicationPath, templatePath,
            `${componentName.toLowerCase()}.${Constant.COMPONENT_EXTENSION}.${Constant.HTML_EXTENSION}`,
            Constant.HTML_TEMPLATENAME, temp, (response) => {
                callback();
            });
    }
    public generateComponentTs(applicationPath, templatePath, componentName, information, entities, callback) {
        console.log('before set routeModule generate component ts are -routeModule--->>  ', information);
        const temp = {
            folderName: componentName.toLowerCase(),
            className: componentName.charAt(0).toUpperCase() + componentName.slice(1).toLowerCase(),
            dependedComponentNames: [],
            importDependency: [],
            importComponent: [],
            importAsteriskDependency: [],
            scriptVariable: [],
            componentVariable: [],
            componentConstructorParams: [],
            componentOnInit: [],
            componentMethod: []
        }

        // this.componentObject = information;
        // add default import dependency path
        temp.importDependency.push({ dependencyName: 'Component, OnInit', dependencyPath: '@angular/core' });

        // add component routes in app-routing.module.ts file
        const importDependencyPath = `import { ${temp.className}Component } from './${temp.folderName.toLowerCase()}/${temp.folderName.toLowerCase()}.${Constant.COMPONENT_EXTENSION}';`;
        if (this.routeModule.importDependency.findIndex(x => x == importDependencyPath) < 0) {
            this.routeModule.importDependency.push(importDependencyPath);
            this.routeModule.routePath.push(`{ path: '${temp.folderName.toLowerCase()}', component: ${temp.className}Component, canActivate: [AuthGuard] },`);
        }
        if (information.routeList.length > 0) {
            elementRouteWorker.checkGpRoute(information.routeList, temp);
        }
        // check other method and dependency in component 
        if (information.otherMethodNames.length > 0) {
            // modules
            this.moduleComponent = {
                importDependency: [],
                imports: [],
                declarations: []
            }
            information.otherMethodNames.forEach(otherElement => {
                if (!temp.dependedComponentNames.find(x => x == otherElement)) {
                    temp.dependedComponentNames.push(otherElement);
                    const findDependencies = componentDependency.component.find(x => x.name == otherElement);
                    if (findDependencies) {
                        if (findDependencies.componentDependencies && findDependencies.componentDependencies.length > 0) {
                            // add component dependencies
                            temp.importAsteriskDependency = temp.importAsteriskDependency.concat(findDependencies.componentDependencies);
                        }
                        if (findDependencies.componentVariableList && findDependencies.componentVariableList.length > 0) {
                            // dependencies variable list added
                            information.dependenciesVariableList = information.dependenciesVariableList.concat(findDependencies.componentVariableList);
                        }
                        if (findDependencies.module.dependencies && findDependencies.module.dependencies.length > 0) {
                            // add dependencies in component modules
                            this.moduleComponent.importDependency = this.moduleComponent.importDependency.concat(findDependencies.module.dependencies);
                            this.moduleComponent.imports = this.moduleComponent.imports.concat(findDependencies.module.imports);
                        }
                        if (findDependencies.packageDependencyList && findDependencies.packageDependencyList.length > 0) {
                            // add in package.json
                            this.packageModule = this.packageModule.concat(findDependencies.packageDependencyList);
                        }

                    }
                }
            })
        }
        // adding the method from generatehtmlworker files
        if (information.elementDependedMethod.length > 0) {
            temp.componentMethod = temp.componentMethod.concat(information.elementDependedMethod);
        }
        flowComponentWorker.generateComponentFlow(information, temp, entities);

        componentSupportWorker.generateComponent(applicationPath, templatePath,
            `${componentName.toLowerCase()}.${Constant.COMPONENT_EXTENSION}.${Constant.TS_EXTENSION}`,
            Constant.TS_TEMPLATENAME, temp, (response) => {
                callback();
            });
    }

    public generateComponentService(applicationPath, templatePath, componentName, information, callback) {
        console.log('before set routeModule SERVICE ts are -routeModule--->>  ', this.routeModule);
        const temp = {
            folderName: componentName.toLowerCase(),
            className: componentName.charAt(0).toUpperCase() + componentName.slice(1).toLowerCase(),
            importDependency: [],
            importComponent: [],
            serviceVariable: null,
            serviceConstructorParams: [],
            serviceMethod: []
        }
        // // this.componentObject = information;
        // // add default import dependency path
        // temp.importDependency.push({ dependencyName: 'Component, OnInit', dependencyPath: '@angular/core' });

        // // add component routes in app-routing.module.ts file
        // const importDependencyPath = `import { ${temp.className}Component } from './${temp.folderName.toLowerCase()}/${temp.folderName.toLowerCase()}.${Constant.COMPONENT_EXTENSION}';`;
        // if (this.routeModule.importDependency.findIndex(x => x == importDependencyPath) < 0) {
        //     this.routeModule.importDependency.push(importDependencyPath);
        //     this.routeModule.routePath.push(`{ path: '${temp.folderName.toLowerCase()}', component: ${temp.className}Component, canActivate: [AuthGuard] },`);
        // }
        flowServiceWorker.generateServiceComponentFlow(information, temp);
        console.log('component service worker are ----  ', temp);
        componentSupportWorker.generateComponent(applicationPath, templatePath,
            `${componentName.toLowerCase()}.${Constant.SERVICE_EXTENSION}.${Constant.TS_EXTENSION}`,
            Constant.SERIVCE_TEMPLATENAME, temp, (response) => {
                callback();
            });
    }



    public generateComponentCss(applicationPath, templatePath, componentName, information, callback) {
        const temp = {
            folderName: componentName.toLowerCase(),
            className: componentName.charAt(0).toUpperCase() + componentName.slice(1).toLowerCase(),
            tag: information
        }
        console.log('before set routeModule SCSS ts are -routeModule--->>  ', this.routeModule);
        console.log('before generate component css are ----  ', temp);
        componentSupportWorker.generateComponent(applicationPath, templatePath,
            `${componentName.toLowerCase()}.${Constant.COMPONENT_EXTENSION}.${Constant.SCSS_EXTENSION}`,
            Constant.CSS_TEMPLATENAME, temp, (response) => {
                callback();
            });
    }
    public generateComponentModule(applicationPath, templatePath, componentName, information, callback) {
        const temp = {
            folderName: componentName.toLowerCase(),
            className: componentName.charAt(0).toUpperCase() + componentName.slice(1).toLowerCase(),
            importDependency: [],
            imports: [],
            declarations: [],
            exports: null
        }
        console.log('before set routeModule MODULE ts are -routeModule--->>  ', this.routeModule);
        // add default module dependency path
        temp.importDependency.push({ dependencyName: 'NgModule', dependencyPath: '@angular/core' });
        temp.importDependency.push({ dependencyName: 'CommonModule', dependencyPath: '@angular/common' });
        temp.importDependency.push({ dependencyName: 'RouterModule', dependencyPath: '@angular/router' });
        temp.importDependency.push({ dependencyName: 'FormsModule, ReactiveFormsModule', dependencyPath: '@angular/forms' });
        // add component class with path
        temp.importDependency.push({ dependencyName: `${temp.className}Component`, dependencyPath: `./${temp.folderName.toLowerCase()}.${Constant.COMPONENT_EXTENSION}` });

        // imports default
        temp.imports.push(`CommonModule`, `RouterModule`);
        // forms imports
        temp.imports.push(`FormsModule`, `ReactiveFormsModule`);

        // declarations default
        temp.declarations.push(`${temp.className}Component`)

        // adding other component module dependencies
        console.log('add other component modeules are ---- ', this.moduleComponent);
        console.log('add other temp modeules are ---- ', temp);
        temp.importDependency = temp.importDependency.concat(this.moduleComponent.importDependency);
        temp.imports = temp.imports.concat(this.moduleComponent.imports);
        temp.declarations = temp.declarations.concat(this.moduleComponent.declarations);

        // add component module in app.module.ts
        const moduleClassName = `${temp.className}Module`;
        if (this.appModule.imports.findIndex(x => x == moduleClassName) < 0) {
            this.appModule.importDependency.push(`import { ${moduleClassName} } from './${temp.folderName.toLowerCase()}/${temp.folderName.toLowerCase()}.${Constant.MODULE_EXTENSION}';`);
            this.appModule.imports.push(`${temp.className}Module,`);
        }

        componentSupportWorker.generateComponent(applicationPath, templatePath,
            `${componentName.toLowerCase()}.${Constant.MODULE_EXTENSION}.${Constant.TS_EXTENSION}`,
            Constant.MODULE_TEMPLATENAME, temp, (response) => {
                callback();
            });
    }
    public generateComponentSpec(applicationPath, templatePath, componentName, information, callback) {
        const temp = {
            folderName: componentName.toLowerCase(),
            className: componentName.charAt(0).toUpperCase() + componentName.slice(1).toLowerCase(),
            tag: []
        }
        console.log('before set routeModule SPEC ts are -routeModule--->>  ', this.routeModule);
        componentSupportWorker.generateComponent(applicationPath, templatePath,
            `${componentName.toLowerCase()}.${Constant.COMPONENT_EXTENSION}.${Constant.SPEC_EXTENSION}.${Constant.TS_EXTENSION}`,
            Constant.SPEC_TEMPLATENAME, temp, (response) => {
                callback();
            });
    }

    public modifyDependency(packagePath, srcPath, applicationPath, globalStyle, callback) {
        console.log('modify dependency in component workers are --111---- ', globalStyle);
        if (this.routeModule.routePath.length > 0) {
            dependencyWorker.modifyAppRouteFile(applicationPath, this.routeModule);
            // this.routeModule.importDependency = [];
            // this.routeModule.routePath = [];
            this.initializeRouteModule();
        }
        if (this.appModule.importDependency.length > 0) {
            dependencyWorker.modifyAppModuleFile(applicationPath, this.appModule);
            this.initializeAppModule();
        }
        if (this.packageModule.length > 0) {
            dependencyWorker.modifyPackageFile(packagePath, this.packageModule);
            this.initializePackageModule();
        }
        if (globalStyle.import.length > 0 || globalStyle.others.length > 0) {
            dependencyWorker.modifyGlobalStyles(srcPath, globalStyle);
            this.initializeOtherInfo();
        }
        console.log(' before callback dependency are ----2222--- ');
        callback();
    }

}