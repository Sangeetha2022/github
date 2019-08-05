import { ComponentSupportWorker } from "../supportworker/componentSupportWorker";
import { DependencyWorker } from "./dependencyWorker";
import { Constant } from "../config/Constant";
import * as util from 'util';
import { FlowComponentWorker } from "./flowComponentWorker";
import { FlowServiceWorker } from "./flowServiceWorker";

const componentSupportWorker = new ComponentSupportWorker();
const dependencyWorker = new DependencyWorker();
const flowComponentWorker = new FlowComponentWorker();
const flowServiceWorker = new FlowServiceWorker();

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

    private componentObject: any;


    private tscomponent = {
        importDependency: [],
        importComponent: [],
        scriptVariable: [],
        componentVariable: [],
        componentConstructorParams: [],
        componentOnInit: [],
        componentMethod: []
    }

    initializedata() {
        this.routeModule = {
            importDependency: [],
            routePath: []
        }
        this.appModule = {
            importDependency: [],
            declarations: [],
            imports: [],
            providers: [],
            bootstrap: []
        }

        this.packageModule = [];
    }

    public generateComponentHtml(applicationPath, templatePath, componentName, information, callback) {
        this.initializedata();
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
        const temp = {
            folderName: componentName.toLowerCase(),
            className: componentName.charAt(0).toUpperCase() + componentName.slice(1).toLowerCase(),
            importDependency: [],
            importComponent: [],
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
        flowComponentWorker.generateComponentFlow(information, temp, entities);
        componentSupportWorker.generateComponent(applicationPath, templatePath,
            `${componentName.toLowerCase()}.${Constant.COMPONENT_EXTENSION}.${Constant.TS_EXTENSION}`,
            Constant.TS_TEMPLATENAME, temp, (response) => {
                callback();
            });
    }

    public generateComponentService(applicationPath, templatePath, componentName, information, endpoints, callback) {
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
        flowServiceWorker.generateServiceComponentFlow(information, temp, endpoints);
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
            tag: []
        }
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
            importDependency: null,
            imports: null,
            declarations: null,
            exports: null
        }
        // add default module dependency path
        temp.importDependency = [];
        temp.importDependency.push({ dependencyName: 'NgModule', dependencyPath: '@angular/core' });
        temp.importDependency.push({ dependencyName: 'CommonModule', dependencyPath: '@angular/common' });
        temp.importDependency.push({ dependencyName: 'RouterModule', dependencyPath: '@angular/router' });
        // add component class with path
        temp.importDependency.push({ dependencyName: `${temp.className}Component`, dependencyPath: `./${temp.folderName.toLowerCase()}.${Constant.COMPONENT_EXTENSION}` });

        // imports default
        temp.imports = [];
        temp.imports.push(`CommonModule`, `RouterModule`);

        // declarations default
        temp.declarations = [];
        temp.declarations.push(`${temp.className}Component`)

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
        componentSupportWorker.generateComponent(applicationPath, templatePath,
            `${componentName.toLowerCase()}.${Constant.COMPONENT_EXTENSION}.${Constant.SPEC_EXTENSION}.${Constant.TS_EXTENSION}`,
            Constant.SPEC_TEMPLATENAME, temp, (response) => {
                callback();
            });
    }

    public modifyDependency(applicationPath, packagePath, callback) {
        if (this.routeModule.routePath.length > 0) {
            dependencyWorker.modifyAppRouteFile(applicationPath, this.routeModule);
        }
        if (this.appModule.importDependency.length > 0) {
            dependencyWorker.modifyAppModuleFile(applicationPath, this.appModule);
        }
        if (this.packageModule.length > 0) {
            dependencyWorker.modifyPackageFile(packagePath, this.packageModule);
        }
        callback();
    }

}