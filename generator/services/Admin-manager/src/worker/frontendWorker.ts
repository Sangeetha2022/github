import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { Common } from '../config/Common';
import { FrontendSupportWorker } from '../SupportWorker/frontendSupportWorker';

export class FrontendWorker {

    private frontendSupportWorker = new FrontendSupportWorker();
    private projectGenerationPath = '';
    private seedPath = '';
    private templatePath = '';


    // FOLDER NAME
    private ADMIN_FOLDERNAME = 'admin';
    private AUTH_FOLDERNAME = 'auth';


    // FILE NAME
    private APP_MODULE_FILENAME = `app.module.ts`;
    private APP_ROUTING_MODULE_FILENAME = `app-routing.module.ts`;
    private PACKAGE_FILENAME = 'package.json';
    private AUTH_GUARD_FILENAME = `${this.AUTH_FOLDERNAME.charAt(0).toUpperCase() + this.AUTH_FOLDERNAME.slice(1)}Guard`;

    // TEMPLATE NAME
    private MODIFY_APP_MODULE_TEMPLATENAME = `modify_app_module`;
    private MODIFY_APP_ROUTNG_TEMPLATENAME = `modify_app_routing`;

    private isAppModule = {
        declaration: false,
        imports: false,
        providers: false,
        boostrap: false
    }
    private authPackageDependency = [];

    private adminComponent = {
        module: {
            importDependency: `import { AdminModule } from './admin/admin.module';`,
            imports: `AdminModule`
        }
    }

    private appModuleInfo: any = {
        importDependency: [],
        imports: [],
        declarations: [],
        providers: [],
        boostrap: [],
        className: null
    }

    private httpClient = {
        importDependency: `import { HttpClientModule } from '@angular/common/http';`,
        imports: `HttpClientModule`
    }

    private adminAppRoutingModule = {
        importDependency: `import { ${this.ADMIN_FOLDERNAME.charAt(0).toUpperCase() + this.ADMIN_FOLDERNAME.slice(1).toLowerCase()}Component } from './${this.ADMIN_FOLDERNAME.toLowerCase()}/${this.ADMIN_FOLDERNAME.toLowerCase()}.component';`,
        imports: `{ path: '${this.ADMIN_FOLDERNAME.toLowerCase()}', component: ${this.ADMIN_FOLDERNAME.charAt(0).toUpperCase() + this.ADMIN_FOLDERNAME.slice(1).toLowerCase()}Component, canActivate: [${this.AUTH_GUARD_FILENAME}] }`
    }

    private isRoutingModule = {
        path: false
    }

    private routingModuleInfo = {
        importDependency: [],
        path: []
    }

    initializeData() {
        this.appModuleInfo = {
            importDependency: [],
            imports: [],
            declarations: [],
            providers: [],
            boostrap: [],
            className: null
        }

        this.routingModuleInfo = {
            importDependency: [],
            path: []
        }
    }

    createAdminComponent(details, callback) {
        this.initializeData();
        this.projectGenerationPath = details.templateResponse.applicationPath;
        this.seedPath = details.seedTemplatePath;
        this.templatePath = details.adminTemplatePath;
        const applicationPath = `${this.projectGenerationPath}/src/app/${this.ADMIN_FOLDERNAME}`;
        this.generateStaticComponent(applicationPath, this.ADMIN_FOLDERNAME, callback);
    }


    async generateStaticComponent(applicationPath, folderName, callback) {
        const loginSeedPath = `${this.seedPath}/${folderName}`;
        Common.createFolders(applicationPath);
        await fs.readdirSync(`${this.seedPath}/${folderName}`).forEach((fileElement, index, array) => {
            console.log('each files names are -------   ', fileElement);
            this.frontendSupportWorker.generateStaticFile(applicationPath, loginSeedPath, fileElement, (response) => {
                if (index === array.length - 1) {
                    callback('static component files are written successfully');
                }
            });
        })
    }

    modifyFiles() {
        const appModulePath = `${this.projectGenerationPath}/src/app`;
        this.modifyAppModuleFile(appModulePath);
        // future use
        this.modifyAppRoutingModuleFile(appModulePath);
        if (this.routingModuleInfo.importDependency.findIndex(x => x == this.adminAppRoutingModule.importDependency) < 0) {
            this.routingModuleInfo.importDependency.push(`import { ${this.ADMIN_FOLDERNAME.charAt(0).toUpperCase() + this.ADMIN_FOLDERNAME.slice(1).toLowerCase()}Component } from './${this.ADMIN_FOLDERNAME.toLowerCase()}/${this.ADMIN_FOLDERNAME.toLowerCase()}.component';`);
            this.routingModuleInfo.path.push(`{ path: '${this.ADMIN_FOLDERNAME.toLowerCase()}', component: ${this.ADMIN_FOLDERNAME.charAt(0).toUpperCase() + this.ADMIN_FOLDERNAME.slice(1).toLowerCase()}Component, canActivate: [${this.AUTH_GUARD_FILENAME}] },`);
        }
        this.modifyPackageJsonFile();
        // modify app module
        // import httpclientmodule in app module files
        // this.appModuleInfo.importDependency.push();
        // this.appModuleInfo.imports.push();
        if (this.appModuleInfo.importDependency.findIndex(x => x == this.httpClient.importDependency) < 0) {
            this.appModuleInfo.importDependency.push(this.httpClient.importDependency);
            this.appModuleInfo.imports.push(this.httpClient.imports);
        }
        if (this.appModuleInfo.importDependency.findIndex(x => x == this.adminComponent.module.importDependency) < 0) {
            this.appModuleInfo.importDependency.push(this.adminComponent.module.importDependency);
            this.appModuleInfo.imports.push(this.adminComponent.module.imports);
        }
        this.frontendSupportWorker.generateFile(appModulePath, this.templatePath,
            this.APP_MODULE_FILENAME, this.MODIFY_APP_MODULE_TEMPLATENAME, this.appModuleInfo, (response) => { });

        // future use of modify app routing file
        this.frontendSupportWorker.generateFile(appModulePath, this.templatePath,
            this.APP_ROUTING_MODULE_FILENAME, this.MODIFY_APP_ROUTNG_TEMPLATENAME, this.routingModuleInfo, (response) => { });
        console.log('modifyu files values are -------  ', this.appModuleInfo);
        console.log('modifyu files values are -app routing files a------  ', this.routingModuleInfo);
    }

    modifyAppModuleFile(appModulePath) {
        appModulePath += `/${this.APP_MODULE_FILENAME}`;
        console.log('modify app module file are -------  ', fs.readFileSync(appModulePath).toString().split("\n"));
        fs.readFileSync(appModulePath).toString().split("\n").forEach(appElement => {
            if (appElement.includes('import') && appElement.includes('from')) {
                console.log('all import depenc are -11-  ', this.appModuleInfo);
                console.log('all import depenc are -22-  ', this.appModuleInfo.importDependency.findIndex(x => x == appElement));
                if (this.appModuleInfo.importDependency.findIndex(x => x == appElement) < 0) {
                    this.appModuleInfo.importDependency.unshift(appElement);
                }

            }
            if (appElement.includes('declarations')) {
                this.isAppModule.declaration = true;
            }
            if (appElement.includes('imports')) {
                this.isAppModule.imports = true;
            }
            if (appElement.includes('providers')) {
                this.isAppModule.providers = true;
            }
            if (appElement.includes('bootstrap')) {
                this.isAppModule.boostrap = true;
            }
            if (appElement.includes('export class')) {
                const regex = /[\w-]*Module/g;
                this.appModuleInfo.className = appElement.match(regex)[0].replace('Module', '');
            }
            if (appElement.includes(']')) {
                this.isAppModule.declaration = false;
                this.isAppModule.imports = false;
                this.isAppModule.providers = false;
                this.isAppModule.boostrap = false;
                this.isAppModule.declaration = false;
            }
            if (this.isAppModule.declaration) {
                if (!appElement.includes('[') && !appElement.includes(']')) {
                    if (this.appModuleInfo.importDependency.findIndex(x => x == appElement) < 0) {
                        this.appModuleInfo.declarations.unshift(appElement.replace(',', ''));
                    }
                }
            }

            if (this.isAppModule.imports) {
                if (!appElement.includes('[') && !appElement.includes(']')) {
                    if (this.appModuleInfo.importDependency.findIndex(x => x == appElement) < 0) {
                        this.appModuleInfo.imports.unshift(appElement.replace(',', ''));
                    }
                }
            }

            if (this.isAppModule.providers) {
                if (!appElement.includes('[') && !appElement.includes(']')) {
                    if (this.appModuleInfo.importDependency.findIndex(x => x == appElement) < 0) {
                        this.appModuleInfo.providers.unshift(appElement.replace(',', ''));
                    }
                }
            }

            if (this.isAppModule.boostrap) {
                if (!appElement.includes('[') && !appElement.includes(']')) {
                    if (this.appModuleInfo.importDependency.findIndex(x => x == appElement) < 0) {
                        this.appModuleInfo.boostrap.unshift(appElement.replace(',', ''));
                    }
                }
            }
        })
        console.log('after completed module app modules are ---- ', this.appModuleInfo);
    }

    modifyAppRoutingModuleFile(appRoutingModulePath) {
        appRoutingModulePath += `/${this.APP_ROUTING_MODULE_FILENAME}`;
        console.log('modify app routing module file are -------  ', fs.readFileSync(appRoutingModulePath).toString().split("\n"));
        fs.readFileSync(appRoutingModulePath).toString().split("\n").forEach(appElement => {
            console.log('app routing each one are -------  ', appElement);
            if (appElement.includes('import') && appElement.includes('from')) {
                if (this.routingModuleInfo.importDependency.findIndex(x => x == appElement) < 0) {
                    if (appElement.includes('.component')) {
                        this.routingModuleInfo.importDependency.push(appElement);
                    } else {
                        this.routingModuleInfo.importDependency.unshift(appElement);
                    }
                }

            }
            if (appElement.includes('routes: Routes')) {
                this.isRoutingModule.path = true;
            }
            if (appElement.includes(']') && !appElement.includes(`canActivate`)) {
                this.isRoutingModule.path = false;

            }
            if (this.isRoutingModule.path) {
                console.log('inside the routingmodule path are   ', appElement, ' --routingpath-- ', this.isRoutingModule.path);
                if (appElement.includes(`canActivate`)) {
                    if (this.routingModuleInfo.path.findIndex(x => x == appElement) < 0) {
                        this.routingModuleInfo.path.push(appElement.replace('},', '}'));
                    }
                } else if (appElement && !appElement.includes('[') && !appElement.includes(']')) {
                    if (this.routingModuleInfo.path.findIndex(x => x == appElement) < 0) {
                        this.routingModuleInfo.path.push(appElement.replace('},', '}'));
                    }
                }
            }
        })
        console.log('app rouint after read and wirte -----  ', this.routingModuleInfo);
    }

    modifyPackageJsonFile() {
        const packageInfo = fs.readFileSync(`${this.projectGenerationPath}/${this.PACKAGE_FILENAME}`).toString().split("\n");
        console.log('after separate package json ----  ', packageInfo);
        console.log('after separate package json -indexOf---  ', packageInfo.indexOf(`"dependencies": {`));
        packageInfo.forEach(element => console.log('each package element values are ---  ', element));
        const index = packageInfo.findIndex(x => x === '  "dependencies": {');
        console.log('package index rae -------  ', index);
        if (index > -1) {
            this.authPackageDependency.forEach(packageElement => {
                if (packageInfo.findIndex(item => item === packageElement) < 0) {
                    packageInfo.splice(index + 10, 0, packageElement);
                }
            })
            this.frontendSupportWorker.writeStaticFile(this.projectGenerationPath, this.PACKAGE_FILENAME, packageInfo, (response) => { });
        }
        console.log('after added values in package are -------  ', packageInfo);

    }

}