import { AcousticSupportWorker } from "../supportworker/acousticSupportWorker";
import { Constant } from "../assets/constant";
import { DependencyWorker } from "./dependencyWorker";
import * as fs from 'fs';
import * as path from 'path';



export class ComponentWorker {

    private acousticSupportWorker = new AcousticSupportWorker();
    private dependencyWorker = new DependencyWorker();

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




    public componentTsFile(applicationPath, templatePath, information) {
        const temp = {
            folderName: information.folderName,
            className: information.componentName,
            dependedComponentNames: [],
            importDependency: [],
            importComponent: [],
            importAsteriskDependency: [],
            scriptVariable: [],
            componentVariable: [],
            componentConstructorParams: [],
            componentOnInit: [],
            componentMethod: [],
            queryvalues: information.component
        }
        if (temp.folderName != 'template'){
            console.log("foldername--inside--->", temp.folderName);
        const importDependencyPath = `import { ${temp.className}Component } from './${temp.folderName.toLowerCase()}/${temp.folderName.toLowerCase()}.${Constant.COMPONENT_EXTENSION}';`;
        if (this.routeModule.importDependency.findIndex(x => x == importDependencyPath) < 0) {
            this.routeModule.importDependency.push(importDependencyPath);
            this.routeModule.routePath.push(`{ path: '${temp.folderName.toLowerCase()}', loadChildren: () => import('./${temp.folderName.toLowerCase()}/${temp.folderName.toLowerCase()}.module').then(mod => mod.${temp.className}Module)},`);
            //this.routeModule.routePath.push(`{ path: '${temp.folderName.toLowerCase()}', component: ${temp.className}Component },`);
        }
    }
        this.acousticSupportWorker.generateComponent(applicationPath, templatePath,
            `${temp.folderName}.${Constant.COMPONENT_EXTENSION}.${Constant.TS_EXTENSION}`,
            Constant.TS_TEMPLATENAME, temp, (response) => { });
    }
    public componentHtmlFile(applicationPath, templatePath, information) {
        // console.log('componentHTMLfile are --- ', information);
        const temp = {
            folderName: information.folderName,
            className: information.componentName,
            tag: information.content
        }
        this.acousticSupportWorker.generateComponent(applicationPath, templatePath,
            `${temp.folderName}.${Constant.COMPONENT_EXTENSION}.${Constant.HTML_EXTENSION}`,
            Constant.HTML_TEMPLATENAME, temp, (response) => {
            });
    }

    public componentCssFile(applicationPath, templatePath, information) {
        const temp = {
            folderName: information.folderName,
            className: information.componentName,
            tag: information.content
        }
        if (temp.tag.length == 0) {
            const cssfiledir = path.resolve(__dirname + '/../assets/Template.css');
            fs.readFile(cssfiledir, 'utf8', (err, csscontent) => {
                // console.log('-----filecontents-----', csscontent);
                temp.tag = csscontent;
                this.acousticSupportWorker.generateComponent(applicationPath, templatePath,
                    `${temp.folderName}.${Constant.COMPONENT_EXTENSION}.${Constant.SCSS_EXTENSION}`,
                    Constant.CSS_TEMPLATENAME, temp, (response) => {
                    });
            })
        } else {
            this.acousticSupportWorker.generateComponent(applicationPath, templatePath,
                `${temp.folderName}.${Constant.COMPONENT_EXTENSION}.${Constant.SCSS_EXTENSION}`,
                Constant.CSS_TEMPLATENAME, temp, (response) => {
                });
        }

    }
    public componentSpecFile(applicationPath, templatePath, information) {
        const temp = {
            folderName: information.folderName,
            className: information.componentName,
            tag: information.content
        }
        this.acousticSupportWorker.generateComponent(applicationPath, templatePath,
            `${temp.folderName}.${Constant.COMPONENT_EXTENSION}.${Constant.SPEC_EXTENSION}.${Constant.TS_EXTENSION}`,
            Constant.SPEC_TEMPLATENAME, temp, (response) => {
            });
    }

    public componentModuleFile(applicationPath, templatePath, information) {
        const temp = {
            folderName: information.folderName,
            className: information.componentName,
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
        // add component class with path
        temp.importDependency.push({ dependencyName: `${temp.className}Component`, dependencyPath: `./${temp.folderName.toLowerCase()}.${Constant.COMPONENT_EXTENSION}` });
        // add factory
        // temp.importDependency.push({ dependencyName: `DynamicComponentLoaderModule`, dependencyPath: `../dynamic-component-loader/dynamic-component-loader.module` });

        // imports default
        temp.imports.push(`CommonModule`, `RouterModule.forChild([
            {path: '', component: ${temp.className}Component}
          ])`);
        // forms imports
        temp.imports.push(`FormsModule`, `ReactiveFormsModule`);
        // factory imports
        //  temp.imports.push(`DynamicComponentLoaderModule.forChild(${temp.className}Component)`);

        // declarations default
        temp.declarations.push(`${temp.className}Component`)

        // // adding other component module dependencies
        // temp.importDependency = temp.importDependency.concat(this.moduleComponent.importDependency);
        // temp.imports = temp.imports.concat(this.moduleComponent.imports);
        // temp.declarations = temp.declarations.concat(this.moduleComponent.declarations);
        // if (this.moduleComponent.exports.length > 0) {
        //     temp.exports = new Array().concat(this.moduleComponent.exports);
        // }

        // add component module in app.module.ts
        // const moduleClassName = `${temp.className}Module`;
        // if (this.appModule.imports.findIndex(x => x == moduleClassName) < 0) {
        //     this.appModule.importDependency.push(`import { ${moduleClassName} } from './${temp.folderName.toLowerCase()}/${temp.folderName.toLowerCase()}.${Constant.MODULE_EXTENSION}';`);
        //     this.appModule.imports.push(`${temp.className}Module,`);
        // }
        // information importDependency;
        if (information.importDependency && information.importDependency.length > 0) {
            temp.importDependency = temp.importDependency.concat(information.importDependency);
        }
        // information imports;
        if (information.imports && information.imports.length > 0) {
            temp.imports = temp.imports.concat(information.imports);
        }
        // information declarations;
        if (information.declarations && information.declarations.length > 0) {
            temp.declarations = temp.declarations.concat(information.declarations);
        }

        // add component module in app.module.ts
        // const moduleClassName = `${temp.className}Module`;
        // if (this.appModule.imports.findIndex(x => x == moduleClassName) < 0) {
        //     this.appModule.importDependency.push(`import { ${moduleClassName} } from './${temp.folderName.toLowerCase()}/${temp.folderName.toLowerCase()}.${Constant.MODULE_EXTENSION}';`);
        //     this.appModule.imports.push(`${temp.className}Module,`);
        // }

        this.acousticSupportWorker.generateComponent(applicationPath, templatePath,
            `${temp.folderName}.${Constant.MODULE_EXTENSION}.${Constant.TS_EXTENSION}`,
            Constant.MODULE_TEMPLATENAME, temp, (response) => { });
    }

    public modifyDependency(applicationPath, pageDetails) {
        const srcPath = `${applicationPath}/${Constant.SRC_FOLDERNAME}/${Constant.APP_FOLDERNAME}`;
        // console.log('modify dependencyc are ---- ', this.routeModule, ' pageDetails ', pageDetails);
        this.dependencyWorker.modifyAppComponent(srcPath);
        if (this.routeModule.routePath.length > 0) {
            this.dependencyWorker.modifyAppRouteFile(srcPath, this.routeModule);
            this.initializeRouteModule();
        }
        if (this.appModule.importDependency.length > 0) {
            this.dependencyWorker.modifyAppModuleFile(srcPath, this.appModule, pageDetails);
            this.initializeAppModule();
        }
        if (this.packageModule.length > 0) {
            this.dependencyWorker.modifyPackageFile(applicationPath, this.packageModule);
            this.initializePackageModule();
        }
        // if (globalStyle.import.length > 0 || globalStyle.others.length > 0) {
        //     dependencyWorker.modifyGlobalStyles(srcPath, globalStyle);
        //     this.initializeOtherInfo();
        // }
        // modify proxy file
        // flowServiceWorker.modifyProxyFile(packagePath);
    }

    public componentName(name) {
        let temp = name.split('-');
        let fileName = '';
        if (temp) {
            return temp.map(a => a.charAt(0).toUpperCase() + a.substr(1)).join('');
        }
        return fileName;
    }

}