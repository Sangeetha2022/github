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

    private angularJsonData = []

    // private packageModule = [`"angular-i18next": "^5.0.6" ,`, `"angular-validation-message": "^1.1.0",`, `"angular-validation-message-i18next": "^1.1.0",`];
    private packageModule = [
        `"angular-i18next": "^5.0.6"`,
        `"angular-validation-message": "^1.1.0"`,
        `"i18next": "^14.0.1"`,
        `"i18next-browser-languagedetector": "^2.2.4"`,
        `"i18next-sprintf-postprocessor": "^0.2.2"`,
        ` "i18next-xhr-backend": "^1.5.1"`,
        `"@ng-select/ng-select": "^5.0.3",`,
    ]

    private moduleComponent = {
        importDependency: [],
        imports: [],
        declarations: [],
        exports: []
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
            declarations: [],
            exports: []
        }
    }

    public generateComponentHtml(applicationPath, templatePath, componentName, information, callback) {
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
        console.log("-----Information----->>>>", information)
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
            componentOnAfterView:[],
            componentMethod: []
        }

        // this.componentObject = information;
        // add component routes in app-routing.module.ts file
        const importDependencyPath = `import { ${temp.className}Component } from './${temp.folderName.toLowerCase()}/${temp.folderName.toLowerCase()}.${Constant.COMPONENT_EXTENSION}';`;
        if (this.routeModule.importDependency.findIndex(x => x == importDependencyPath) < 0) {
            this.routeModule.importDependency.push(importDependencyPath);
            this.routeModule.routePath.push(`{ path: '${temp.folderName.toLowerCase()}', loadChildren: () => import('./${temp.folderName.toLowerCase()}/${temp.folderName.toLowerCase()}.module').then(mod => mod.${temp.className}Module) , canActivate: [AuthGuard] },`);
        }
        if (information.routeList.length > 0) {
            elementRouteWorker.checkGpRoute(information.routeList, temp);
        }
        if (information.componentOnInit.length > 0) {
            temp.componentOnInit = temp.componentOnInit.concat(information.componentOnInit);
        }
        // check other method and dependency in component 
        if (information.otherMethodNames.length > 0) {
            // modules
            this.moduleComponent = {
                importDependency: [],
                imports: [],
                declarations: [],
                exports: []
            }
            information.otherMethodNames.forEach(otherElement => {
                if (!temp.dependedComponentNames.find(x => x == otherElement)) {
                    temp.dependedComponentNames.push(otherElement);
                    const findDependencies = componentDependency.component.find(x => x.name == otherElement);
                    console.log("Find---Depedency0----->>>>", findDependencies);
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
        // add default import dependency path
        let componentImportDependencies = 'Component, OnInit';
        const tempVar = [];
        information.variableList.forEach(variableElement => {
            if (typeof variableElement === 'string') {
                if (variableElement.includes('@Output')) {
                    this.checkDependencies(tempVar, 'Output');
                }
                if (variableElement.includes('@Input')) {
                    this.checkDependencies(tempVar, 'Input');
                }
                if (variableElement.includes('new EventEmitter')) {
                    this.checkDependencies(tempVar, 'EventEmitter');
                }
            }
        })
        if (tempVar.length > 0) {
            componentImportDependencies += `, ${tempVar.join(', ')}`;
            // adding component module exports 
            this.moduleComponent.exports.push(`${temp.className}Component`);
        }
        temp.importDependency.push({ dependencyName: componentImportDependencies, dependencyPath: '@angular/core' });
        //import ngx-toastr component
        temp.importDependency.push({ dependencyName: 'ToastrService', dependencyPath: 'ngx-toastr' });


        console.log('---------component information in ts file-----',information);
        flowComponentWorker.generateComponentFlow(information, temp, entities);

        componentSupportWorker.generateComponent(applicationPath, templatePath,
            `${componentName.toLowerCase()}.${Constant.COMPONENT_EXTENSION}.${Constant.TS_EXTENSION}`,
            Constant.TS_TEMPLATENAME, temp, (response) => {
                callback();
            });
    }

    checkDependencies(tempVar, dependencyName) {
        if (tempVar.findIndex(x => x === dependencyName) < 0) {
            tempVar.push(dependencyName);
        }
    }

    public generateComponentService(applicationPath, templatePath, componentName, information, callback) {
        const temp = {
            folderName: componentName.toLowerCase(),
            className: componentName.charAt(0).toUpperCase() + componentName.slice(1).toLowerCase(),
            importDependency: [],
            importComponent: [],
            serviceVariable: null,
            serviceConstructorParams: [],
            serviceMethod: []
        }
        flowServiceWorker.generateServiceComponentFlow(information, temp, templatePath);
        componentSupportWorker.generateComponent(applicationPath, templatePath,
            `${componentName.toLowerCase()}.${Constant.SERVICE_EXTENSION}.${Constant.TS_EXTENSION}`,
            Constant.SERIVCE_TEMPLATENAME, temp, (response) => {
                callback();
            });
    }



    public generateComponentCss(applicationPath, templatePath, componentName, information, callback) {
        console.log('---------Css information ------', information);
        const temp = {
            folderName: componentName.toLowerCase(),
            className: componentName.charAt(0).toUpperCase() + componentName.slice(1).toLowerCase(),
            tag: information
        }
        componentSupportWorker.generateComponent(applicationPath, templatePath,
            `${componentName.toLowerCase()}.${Constant.COMPONENT_EXTENSION}.${Constant.SCSS_EXTENSION}`,
            Constant.CSS_TEMPLATENAME, temp, (response) => {
                callback();
            });
    }
    public generateComponentModule(applicationPath, templatePath, componentName, information,  callback) {

        const temp = {
            folderName: componentName.toLowerCase(),
            className: componentName.charAt(0).toUpperCase() + componentName.slice(1).toLowerCase(),
            importDependency: [],
            imports: [],
            declarations: [],
            exports: null
        }
        // add default module dependency path
        temp.importDependency.push({ dependencyName: 'NgModule', dependencyPath: '@angular/core' });
        temp.importDependency.push({ dependencyName: 'CommonModule', dependencyPath: '@angular/common' });
        temp.importDependency.push({ dependencyName: 'RouterModule', dependencyPath: '@angular/router' });
        temp.importDependency.push({ dependencyName: 'FormsModule, ReactiveFormsModule', dependencyPath: '@angular/forms' });
        if(information.dynamictype == 'dynamicdropdown-type'){
            temp.importDependency.push({ dependencyName: 'NgSelectModule', dependencyPath: '@ng-select/ng-select' });
            temp.imports.push(`NgSelectModule`);
        }
        // add component class with path
        temp.importDependency.push({ dependencyName: `${temp.className}Component`, dependencyPath: `./${temp.folderName.toLowerCase()}.${Constant.COMPONENT_EXTENSION}` });

        // import { ToastrModule } from 'ngx-toastr';

        temp.importDependency.push({ dependencyName: 'ToastrModule', dependencyPath: 'ngx-toastr' })

        // imports default
        temp.imports.push(`CommonModule`, `RouterModule`);
        // forms imports
        temp.imports.push(`FormsModule`, `ReactiveFormsModule`);

        temp.imports.push (`RouterModule.forChild([
            {path: '', component: ${temp.className}Component
          ]),`)
        //toaster import added
        temp.imports.push(`ToastrModule.forRoot({ preventDuplicates: true })`)

        // declarations default
        temp.declarations.push(`${temp.className}Component`)
                
        // adding other component module dependencies
        temp.importDependency = temp.importDependency.concat(this.moduleComponent.importDependency);
        temp.imports = temp.imports.concat(this.moduleComponent.imports);
        temp.declarations = temp.declarations.concat(this.moduleComponent.declarations);
        if (this.moduleComponent.exports.length > 0) {
            temp.exports = new Array().concat(this.moduleComponent.exports);
        }

        // add component module in app.module.ts
        const moduleClassName = `${temp.className}Module`;
        if (this.appModule.imports.findIndex(x => x == moduleClassName) < 0) {
            this.appModule.importDependency.push(`import { ${moduleClassName} } from './${temp.folderName.toLowerCase()}/${temp.folderName.toLowerCase()}.${Constant.MODULE_EXTENSION}';`);
            this.appModule.imports.push(`${temp.className}Module,`);
        }

        // information importDependency;
        if (information.importDependency.length > 0) {
            temp.importDependency = temp.importDependency.concat(information.importDependency);
        }
        // information imports;
        if (information.imports.length > 0) {
            temp.imports = temp.imports.concat(information.imports);
        }
        // information declarations;
        if (information.declarations.length > 0) {
            temp.declarations = temp.declarations.concat(information.declarations);
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

    public modifyDependency(packagePath, srcPath, applicationPath, globalStyle, microFlows, callback) {

        //toaster implemented angular.json and package.json files
        if (microFlows.length > 0) {
            microFlows.map(data => {
                if (data.actionOnData == 'GpCreate' || data.actionOnData == 'GpUpdate') {
                    this.packageModule.push(`"ngx-toastr": "^10.1.0",`)
                    this.angularJsonData.push('node_modules/ngx-toastr/toastr.css')
                    dependencyWorker.modifyAngularJsonFile(packagePath, this.angularJsonData)
                }
            })
        }

        if (this.routeModule.routePath.length > 0) {
            dependencyWorker.modifyAppRouteFile(applicationPath, this.routeModule);
            this.initializeRouteModule();
        }
        if (this.appModule.importDependency.length > 0) {
            dependencyWorker.modifyAppModuleFile(applicationPath, this.appModule);
            this.initializeAppModule();
        }
        // if (this.packageModule.length > 0) {
        console.log(`package json -------`, this.packageModule)
        dependencyWorker.modifyPackageFile(packagePath, this.packageModule);
        this.initializePackageModule();
        // }
        if (globalStyle.import.length > 0 || globalStyle.others.length > 0) {
            dependencyWorker.modifyGlobalStyles(srcPath, globalStyle);
            this.initializeOtherInfo();
        }
        // modify proxy file
        flowServiceWorker.modifyProxyFile(packagePath);
        callback();
    }

}