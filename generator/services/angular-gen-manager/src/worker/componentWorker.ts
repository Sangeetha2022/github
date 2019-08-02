import { ComponentSupportWorker } from "../supportworker/componentSupportWorker";
import { DependencyWorker } from "./dependencyWorker";
import { Constant } from "../config/Constant";

const componentSupportWorker = new ComponentSupportWorker();
const dependencyWorker = new DependencyWorker();

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
    public generateComponentTs(applicationPath, templatePath, componentName, information, callback) {
        const temp = {
            folderName: componentName.toLowerCase(),
            className: componentName.charAt(0).toUpperCase() + componentName.slice(1).toLowerCase(),
            importDependency: null,
            importComponent: null,
            scriptVariable: null,
            componentVariable: null,
            componentConstructorParams: null,
            componentOnInit: null,
            componentMethod: null
        }
        this.componentObject = information;
        // add default import dependency path
        temp.importDependency = [];
        temp.importDependency.push({ dependencyName: 'Component, OnInit', dependencyPath: '@angular/core' });

        // add component routes in app-routing.module.ts file
        const importDependencyPath = `import { ${temp.className}Component } from './${temp.folderName.toLowerCase()}/${temp.folderName.toLowerCase()}.${Constant.COMPONENT_EXTENSION}';`;
        if (this.routeModule.importDependency.findIndex(x => x == importDependencyPath) < 0) {
            this.routeModule.importDependency.push(importDependencyPath);
            this.routeModule.routePath.push(`{ path: '${temp.folderName.toLowerCase()}', component: ${temp.className}Component, canActivate: [AuthGuard] },`);
        }
        this.checkConnector(temp.folderName);
        componentSupportWorker.generateComponent(applicationPath, templatePath,
            `${componentName.toLowerCase()}.${Constant.COMPONENT_EXTENSION}.${Constant.TS_EXTENSION}`,
            Constant.TS_TEMPLATENAME, temp, (response) => {
                callback();
            });
    }

    private checkConnector(componentName) {
        // flow method with connector
        this.componentObject.flowMethod.forEach(flowElement => {
            flowElement.connector.forEach(connectorElement => {
                if (connectorElement.isDefault && !connectorElement.isDisabled) {
                    this.addComponentMethod(flowElement, componentName);
                }
            })
        })
    }

    private addComponentMethod(flowElement, componentName) {
        const serviceClassName = `${componentName.charAt(0).toUpperCase()}${componentName.slice(1)}${Constant.SERVICE_EXTENSION.charAt(0).toUpperCase()}${Constant.SERVICE_EXTENSION.slice(1)}`;
        switch (flowElement.actionOnData) {
            case Constant.GP_CREATE_FLOW:
                let temp = `${flowElement.name}() {`;
                temp += `\n this.${serviceClassName.charAt(0).toLowerCase()}${serviceClassName.slice(1)}.${flowElement.name}(this.${this.componentObject.variableList[0].entityName})`;
                temp += `\n  .subscribe(`;
                temp += `\n    data => {`;
                temp += `\n       console.log('data created successfully');`;
                temp += `\n    },`;
                temp += `\n    error => {`;
                temp += `\n       console.log('cannot able to create the data');`;
                temp += `\n    }`;
                temp += `\n    );`;
                temp += `\n}`;
                break;
            case Constant.GP_SEARCH_FLOW:
                break;
            case Constant.GP_UPDATE_FLOW:
                break;
            case Constant.GP_DELETE_FLOW:
                break;
            case Constant.GP_GETALLVALUES_FLOW:
                break;
            case Constant.GP_SEARCHDETAIL_FLOW:
                break;
            case Constant.GP_SEARCHFORUPDATE_FLOW:
                break;
            case Constant.GP_DELETENOUNRELATIONSHIP_FLOW:
                break;
            case Constant.GP_FILEUPLOAD_FLOW:
                break;
            case Constant.GP_DELETENOUNBYRELATION_FLOW:
                break;
            case Constant.GP_CANCEL_FLOW:
                break;
            case Constant.GP_GETNOUNFROMRELATION_FLOW:
                break;
            case Constant.GP_APPSTARTUP_FLOW:
                break;
            case Constant.GP_GRIDEXPORTCSV_FLOW:
                break;
            case Constant.GP_CREATERELATIONSHIP_FLOW:
                break;
            case Constant.GP_RECORDVIDEO_FLOW:
                break;
            case Constant.GP_GETNOUNBYRELATIONSHIP_FLOW:
                break;
            case Constant.GP_TAKEPHOTO_FLOW:
                break;
            case Constant.GP_CUSTOM_FLOW:
                break;
            case Constant.GP_GETNOUNBYID_FLOW:
                break;
            case Constant.GP_DELETEBYPARENTID_FLOW:
                break;
            case Constant.GP_GETNOUNBYPARENTID_FLOW:
                break;
            default:
                break;

        }
    }

    private setImport() { }

    // private set

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