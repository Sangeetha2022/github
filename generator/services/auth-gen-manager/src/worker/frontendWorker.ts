import * as fs from 'fs';
import { Common } from '../config/Common';
import { FrontendSupportWorker } from '../Supportworker/frontendSupportWorker';

export class FrontendWorker {
    private frontendSupportWorker = new FrontendSupportWorker();
    private projectGenerationPath = '';
    private seedPath = '';
    private authTemplatePath = '';

    // FOLDER NAME
    private LOGIN_FOLDERNAME = 'login';
    private SIGNUP_FOLDERNAME = 'signup';
    private AUTH_FOLDERNAME = 'auth';


    // FILE NAME
    private SERVICE_NAME = 'service';
    private MODULE_NAME = 'module';
    private APP_MODULE_FILENAME = `app.module.ts`;
    private APP_ROUTING_MODULE_FILENAME = `app-routing.module.ts`;
    private PACKAGE_FILENAME = 'package.json';
    private AUTH_GUARD_FILENAME = `${this.AUTH_FOLDERNAME.charAt(0).toUpperCase() + this.AUTH_FOLDERNAME.slice(1)}Guard`;

    // TEMPLATE NAME
    private LOGIN_SERVICE_TEMPLATENAME = 'login_service';
    private MODULE_TEMPLATENAME = 'component_module';
    private MODIFY_APP_MODULE_TEMPLATENAME = `modify_app_module`;
    private MODIFY_APP_ROUTNG_TEMPLATENAME = `modify_app_routing`;

    private isAppModule = {
        declaration: false,
        imports: false,
        providers: false,
        boostrap: false
    }
    private authPackageDependency = [
        `   "rxjs-compat": "6.5.2",`,
        `   "@auth0/angular-jwt": "2.1.2",`
    ]

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

    createLoginComponent(details, callback) {
        this.initializeData();
        this.projectGenerationPath = details.templateResponse.applicationPath;
        this.seedPath = details.seedTemplatePath;
        this.authTemplatePath = details.authTemplatePath;
        const loginApplicationPath = `${this.projectGenerationPath}/src/app/${this.LOGIN_FOLDERNAME}`;
        this.generateStaticComponent(loginApplicationPath, this.LOGIN_FOLDERNAME);
        this.generateServiceComponent(details.templateResponse.shared, this.LOGIN_FOLDERNAME,
            this.LOGIN_SERVICE_TEMPLATENAME, loginApplicationPath);
        this.generateModule(this.LOGIN_FOLDERNAME,
            this.MODULE_TEMPLATENAME, loginApplicationPath);
        callback();
    }

    createSignupComponent(callback) {
        const signupApplicationPath = `${this.projectGenerationPath}/src/app/${this.SIGNUP_FOLDERNAME}`;
        this.generateStaticComponent(signupApplicationPath, this.SIGNUP_FOLDERNAME);
        this.generateModule(this.SIGNUP_FOLDERNAME,
            this.MODULE_TEMPLATENAME, signupApplicationPath);
        callback();
    }

    createAuthComponent(callback) {
        const AuthApplicationPath = `${this.projectGenerationPath}/src/app/${this.AUTH_FOLDERNAME}`;
        if (this.routingModuleInfo.importDependency.findIndex(x => x == `import { ${this.AUTH_GUARD_FILENAME} } from './${this.AUTH_FOLDERNAME}/${this.AUTH_FOLDERNAME}.guard';`) < 0) {
            this.routingModuleInfo.importDependency.push(`import { ${this.AUTH_GUARD_FILENAME} } from './${this.AUTH_FOLDERNAME}/${this.AUTH_FOLDERNAME}.guard';`);
        }
        this.generateStaticComponent(AuthApplicationPath, this.AUTH_FOLDERNAME);
        callback();
    }

    async generateStaticComponent(applicationPath, folderName) {
        const loginSeedPath = `${this.seedPath}/${folderName}`;
        Common.createFolders(applicationPath);
        await fs.readdirSync(`${this.seedPath}/${folderName}`).forEach(fileElement => {
            console.log('each files names are -------   ', fileElement);
            this.frontendSupportWorker.generateStaticFile(applicationPath, loginSeedPath, fileElement);
        })
    }

    async generateServiceComponent(sharedObj, folderName, templateName, applicationPath) {
        const fileName = `${folderName}.${this.SERVICE_NAME}.ts`;
        const temp = {
            className: folderName.charAt(0).toUpperCase() + folderName.slice(1),
            shared: {
                className: `${sharedObj.className}${this.SERVICE_NAME.charAt(0).toUpperCase() + this.SERVICE_NAME.slice(1)}`,
                objectName: `${sharedObj.className.charAt(0).toLowerCase() + sharedObj.className.slice(1)}${this.SERVICE_NAME.charAt(0).toUpperCase() + this.SERVICE_NAME.slice(1)}`,
                variableName: sharedObj.variableName
            }
        }
        this.frontendSupportWorker.generateFile(applicationPath, this.authTemplatePath, fileName, templateName, temp);
    }

    async generateModule(folderName, templateName, applicationPath) {
        const fileName = `${folderName}.${this.MODULE_NAME}.ts`;
        const tempImports = [];
        const tempDeclarations = [];

        // app module dependency
        // this.appModuleInfo.importDependency.push(`import { ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}${this.MODULE_NAME.charAt(0).toUpperCase() + this.MODULE_NAME.slice(1)} } from './${folderName}/${folderName}.module';`);
        // this.appModuleInfo.imports.push(`${folderName.charAt(0).toUpperCase() + folderName.slice(1)}${this.MODULE_NAME.charAt(0).toUpperCase() + this.MODULE_NAME.slice(1)}`);
        if (this.appModuleInfo.importDependency.findIndex(x => x == `import { ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}${this.MODULE_NAME.charAt(0).toUpperCase() + this.MODULE_NAME.slice(1)} } from './${folderName}/${folderName}.module';`) < 0) {
            this.appModuleInfo.importDependency.push(`import { ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}${this.MODULE_NAME.charAt(0).toUpperCase() + this.MODULE_NAME.slice(1)} } from './${folderName}/${folderName}.module';`);
            this.appModuleInfo.imports.push(`${folderName.charAt(0).toUpperCase() + folderName.slice(1)}${this.MODULE_NAME.charAt(0).toUpperCase() + this.MODULE_NAME.slice(1)}`);
        }
        // app routing module
        if (this.routingModuleInfo.importDependency.findIndex(x => x == `import { ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Component } from './${folderName}/${folderName}.component';`) < 0) {
            if (folderName == this.LOGIN_FOLDERNAME) {
                this.routingModuleInfo.path.push(`{ path: '', component: ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Component, pathMatch: 'full' }`);
            }
            this.routingModuleInfo.importDependency.push(`import { ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Component } from './${folderName}/${folderName}.component';`);
            this.routingModuleInfo.path.push(`{ path: '${folderName}', component: ${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Component }`);
        }


        const temp = {
            importDependency: [],
            imports: null,
            declarations: null,
            className: folderName.charAt(0).toUpperCase() + folderName.slice(1)
        }
        temp.importDependency.push({ dependencyname: 'NgModule', dependencyPath: '@angular/core' });
        temp.importDependency.push({ dependencyname: 'CommonModule', dependencyPath: '@angular/common' });
        temp.importDependency.push({ dependencyname: 'FormsModule', dependencyPath: '@angular/forms' });
        temp.importDependency.push({ dependencyname: 'RouterModule', dependencyPath: '@angular/router' });
        temp.importDependency.push({ dependencyname: `${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Component`, dependencyPath: `./${folderName}.component` });


        tempImports.push(`CommonModule`);
        tempImports.push(`FormsModule`);
        tempImports.push(`RouterModule`);

        tempDeclarations.push(`${folderName.charAt(0).toUpperCase() + folderName.slice(1)}Component`);

        temp.imports = tempImports.join(',\n');
        temp.declarations = tempDeclarations.join(',\n');

        this.frontendSupportWorker.generateFile(applicationPath, this.authTemplatePath, fileName, templateName, temp);
    }

    modifyFiles() {
        const appModulePath = `${this.projectGenerationPath}/src/app`;
        this.modifyAppModuleFile(appModulePath);
        this.modifyAppRoutingModuleFile(appModulePath);
        this.modifyPackageJsonFile();
        // modify app module
        // import httpclientmodule in app module files
        // this.appModuleInfo.importDependency.push();
        // this.appModuleInfo.imports.push();
        if (this.appModuleInfo.importDependency.findIndex(x => x == this.httpClient.importDependency) < 0) {
            this.appModuleInfo.importDependency.push(this.httpClient.importDependency);
            this.appModuleInfo.imports.push(this.httpClient.imports);
        }
        this.frontendSupportWorker.generateFile(appModulePath, this.authTemplatePath,
            this.APP_MODULE_FILENAME, this.MODIFY_APP_MODULE_TEMPLATENAME, this.appModuleInfo);

        // modify app routing file
        this.frontendSupportWorker.generateFile(appModulePath, this.authTemplatePath,
            this.APP_ROUTING_MODULE_FILENAME, this.MODIFY_APP_ROUTNG_TEMPLATENAME, this.routingModuleInfo);
        // console.log('modifyu files values are -------  ', this.appModuleInfo);
        // console.log('modifyu files values are -app routing files a------  ', this.routingModuleInfo);
    }

    modifyAppModuleFile(appModulePath) {
        appModulePath += `/${this.APP_MODULE_FILENAME}`;
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
            if (appElement.includes(']')) {
                this.isRoutingModule.path = false;

            }
            if (this.isRoutingModule.path) {
                console.log('is appElement.includes( path matched  ', appElement.includes(`path: ''`));
                if (!appElement.includes('[') && !appElement.includes(']')) {
                    if (this.routingModuleInfo.importDependency.findIndex(x => x == appElement) < 0) {
                        if (appElement.includes(`redirectTo: ''`)) {
                            this.routingModuleInfo.path.unshift(appElement.replace('},', '}'));
                        } else if (appElement.includes(`path: ''`)) {
                            this.routingModuleInfo.path.push(appElement.replace(`path: ''`, `path: 'home'`).replace('},', `, canActivate:[${this.AUTH_GUARD_FILENAME}] }`));
                        } else {
                            this.routingModuleInfo.path.push(appElement.replace('},', `, canActivate: [${this.AUTH_GUARD_FILENAME}] }`));
                        }
                    }
                }
            }
        })
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
            this.frontendSupportWorker.writeStaticFile(this.projectGenerationPath, this.PACKAGE_FILENAME, packageInfo);
        }
        console.log('after added values in package are -------  ', packageInfo);

    }
}