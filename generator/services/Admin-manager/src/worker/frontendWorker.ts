import { response, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { Common } from '../config/Common';
import { FrontendSupportWorker } from '../SupportWorker/frontendSupportWorker';
import { ExternalFeatureService } from '../apiservices/ExternalFeatureService';
import { ConnectorService } from '../apiservices/ConnectorService'
import * as ncp from 'ncp';
import * as st from 'stringtemplate-js';
import { Constant } from '../config/Constant'
export class FrontendWorker {

    private frontendSupportWorker = new FrontendSupportWorker();
    private externalfeatureservice = new ExternalFeatureService();
    private connectorService = new ConnectorService();
    private projectGenerationPath = '';
    private seedPath = '';
    private templatePath = '';


    // FOLDER NAME
    private ADMIN_FOLDERNAME = 'admin';
    private AUTH_FOLDERNAME = 'auth';
    private ADMIN_CONFIGFOLDERNAME = 'adminconfig';

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
    featuredetails: any;
    externaladminfeature: any;
    exterfeaturedetails: any;
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

    async createAdminComponent(details, callback) {
        this.initializeData();
        console.log('details =========>>>>>', details);
        this.projectGenerationPath = details.templateResponse.applicationPath;
        this.seedPath = details.seedTemplatePath;
        this.templatePath = details.adminTemplatePath;
        this.exterfeaturedetails = details.externalfeature;
        console.log('-------value------', this.exterfeaturedetails);
        if (this.exterfeaturedetails !== undefined) {
            if (this.exterfeaturedetails.type === 'external') {
                this.routingModuleInfo.importDependency.push(`import { ${this.ADMIN_CONFIGFOLDERNAME.charAt(0).toUpperCase() + this.ADMIN_CONFIGFOLDERNAME.slice(1).toLowerCase()}Component } from './${this.ADMIN_CONFIGFOLDERNAME.toLowerCase()}/${this.ADMIN_CONFIGFOLDERNAME.toLowerCase()}.component';`);
                this.routingModuleInfo.path.push(`{ path: '${this.ADMIN_CONFIGFOLDERNAME.toLowerCase()}', component: ${this.ADMIN_CONFIGFOLDERNAME.charAt(0).toUpperCase() + this.ADMIN_CONFIGFOLDERNAME.slice(1).toLowerCase()}Component, canActivate: [${this.AUTH_GUARD_FILENAME}] }`);

                let srcpath = this.seedPath + '/' + this.ADMIN_CONFIGFOLDERNAME;
                let destinationpath = this.projectGenerationPath + '/src/app/' + this.ADMIN_CONFIGFOLDERNAME;
                ncp.limit = 16;
                ncp(srcpath, destinationpath, { clobber: false }, (err) => {
                    if (err) {
                        console.error('---error occured in the ncp of external feature----', err);
                    }
                    console.log('code added.....');
                });

            }
            this.featuredetails = await this.Getexternalfeature(details.externalfeature);
            let adminfeature = this.featuredetails.body[0];
            console.log('----------admin feature-----', adminfeature)
            this.externaladminfeature = await this.ExternalfeatureAdmin(adminfeature);
            console.log('--------Admin feature--html-------', this.externaladminfeature);
        }
        const applicationPath = `${this.projectGenerationPath}/src/app/${this.ADMIN_FOLDERNAME}`;
        this.generateStaticComponent(details, applicationPath, this.ADMIN_FOLDERNAME, callback);
    }


    async generateStaticComponent(details, applicationPath, folderName, callback) {
        const loginSeedPath = `${this.seedPath}/${folderName}`;
        let projectDetails: any = await this.getConnectorByProjectId(details.project_id);
        let connectorsDetails = projectDetails.body.needs_administration;
        const connectorIds = connectorsDetails.map(({ id }) => id);
        let connectorArray: any = await this.getConnectorById(connectorIds);
        let connectorsData = Constant.JSON_DATA;
        Common.createFolders(applicationPath);
        await fs.readdirSync(`${this.seedPath}/${folderName}`).forEach(async (fileElement, index, array) => {
            console.log('each files names are -------   ', fileElement);
            if (fileElement == 'admin.component.html') {
                if (this.exterfeaturedetails) {
                    if (this.exterfeaturedetails.type == 'external') {
                        await fs.readFile(`${loginSeedPath}/${fileElement}`, 'utf8', (err, htmlcontent) => {
                            console.log('----------adminhtml-------', htmlcontent.toString().split("\n"));
                            let file = htmlcontent.toString().split("\n");
                            const htmlArray = file.filter(element => element.includes('</div>'));
                            let htmlindex = file.lastIndexOf(htmlArray[htmlArray.length - 1]);
                            file.splice(htmlindex + 1, 0, this.externaladminfeature);
                            console.log('---------------file------', file);
                            this.frontendSupportWorker.writeStaticFile(applicationPath, fileElement, file, (response) => {
                                callback('admin component html files are written successfully');
                            });
                        })
                    }
                } else {
                    if (connectorsData.length > 0) {

                        let adminHtmlData = {
                            connectors: []
                        };
                        let connector_admin_data = {
                            connectors: []
                        }
                        connectorsData.forEach(async (connectorObject) => {
                            let jsonObject: any = JSON.parse(connectorObject.data);
                            
                            console.log('connectorObject', jsonObject.item);
                            adminHtmlData.connectors.push(`<div class="card-header collapsed" role="tab" id="headingOneH" href="#${connectorObject.name}" data-toggle="collapse"
                            data-parent="#accordionH" aria-expanded="false" aria-controls="collapseOneH">
                            <a class="card-title">${connectorObject.name}</a>
                          </div>
                          <div class="collapse" id="${connectorObject.name}" role="tabpanel" aria-labelledby="headingOneH">
                            <div class="card-body">
                              <a routerLink="/${connectorObject.name.toLowerCase()}" class="btn btn-primary">${connectorObject.name}</a>
                            </div>
                          </div>`)
                            await this.frontendSupportWorker.generateFile(applicationPath, this.templatePath, fileElement, 'admin_dynamic_html', adminHtmlData, (response) => {
                            })
                            let arrayData = jsonObject.item.filter(function (a) {
                                var key = a.request.auth.type;
                                if (!this[key]) {
                                    this[key] = true;
                                    return true;
                                }
                            }, Object.create(null));
                            await arrayData.forEach(data => {
                                Object.keys(data.request.auth).forEach(key => {
                                    if (typeof (data.request.auth[key]) == "object") {
                                        data.request.auth[key].forEach(childData => {
                                            connector_admin_data.connectors.push(`<div id="template-ivnj" class="row">
                                            <div id="template-ikqf" class="cell form-group">
                                            <label id="template-iytwi" class="label">${childData.key}</label>
                                            <input id="template-isk94" placeholder="Please Enter Value" [(ngModel)]="${connectorObject.name.toLowerCase()}Data.${childData.key}"
                                            [ngModelOptions]="{standalone: true}"  class="input form-control" />
                                            </div>
                                            </div>`);
                                        })
                                    }
                                })
                            });
                            this.generateConnectorAdminHtml(applicationPath, connectorObject, connector_admin_data);
                            this.generateConnectorAdminCss(applicationPath, connectorObject);
                            this.generateConnectorAdminComponentTs(applicationPath, connectorObject, arrayData);
                            this.generateConnectorServiceSpec(applicationPath, connectorObject, arrayData);
                            this.generateConnectorService(applicationPath, connectorObject, arrayData);

                        })
                    } else {
                        this.frontendSupportWorker.generateStaticFile(applicationPath, loginSeedPath, fileElement, (response) => {
                            if (index === array.length - 1) {
                                callback('static component files are written successfully');
                            }
                        });
                    }

                }
            } else {
                console.log('each files names are -------   ', fileElement, index, array);
                this.frontendSupportWorker.generateStaticFile(applicationPath, loginSeedPath, fileElement, (response) => {
                    if (index === array.length - 1) {
                        callback('static component files are written successfully');
                    }
                });
            }

        })
    }

    async generateConnectorServiceSpec(applicationPath, connectorObject, arrayData) {
        const fileData = {
            className: connectorObject.name.charAt(0).toUpperCase() + connectorObject.name.slice(1).toLowerCase(),
            folderName: `${connectorObject.name.toLowerCase()}-admin`
        }
        this.frontendSupportWorker.generateFile(applicationPath + connectorObject.name.toLowerCase(), this.templatePath,
        `${connectorObject.name.toLowerCase()}-admin.service.spec.ts`, `connector_admin_component_spec`, fileData, (response) => {
        });
    }

    async generateConnectorService(applicationPath, connectorObject, arrayData) {
        const temp = {
            folderName: connectorObject.name.toLowerCase(),
            className: connectorObject.name.charAt(0).toUpperCase() + connectorObject.name.slice(1).toLowerCase(),
            importDependency: [
                { dependencyName: `Observable`, dependencyPath: 'rxjs' },
                { dependencyName: `HttpClient`, dependencyPath: '@angular/common/http' },
            ],
            importComponent: [
                {
                    classname: `SharedService`,
                    path: `../../shared/shared.service`
                }
            ],
            importAsteriskDependency: [],
            scriptVariable: [],
            serviceVariable: [],
            serviceConstructorParams: [
                `private sharedService: SharedService, private http: HttpClient`
            ],
            componentOnInit: [],
            componentOnAfterView: [],
            serviceMethod: []
        }
        await temp.serviceMethod.push(`GpCreate(${temp.folderName}): Observable<any> {
            return this.http.post(this.sharedService.DESKTOP_API + '/${temp.folderName}', ${temp.folderName});
        }`);
        this.frontendSupportWorker.generateFile(applicationPath + connectorObject.name.toLowerCase(), this.templatePath,
        `${connectorObject.name.toLowerCase()}-admin.service.ts`, `connector_admin_component_service`, temp, (response) => {
        });
    }

    async generateConnectorModule(applicationPath, connectorObject, arrayData) {

    }

    async generateConnectorAdminComponentTs(applicationPath, connectorObject, arrayData) {
        const temp = {
            folderName: connectorObject.name.toLowerCase(),
            className: connectorObject.name.charAt(0).toUpperCase() + connectorObject.name.slice(1).toLowerCase(),
            dependedComponentNames: [],
            importDependency: [
                { dependencyName: `Component, OnInit`, dependencyPath: '@angular/core' },
                { dependencyName: `Router`, dependencyPath: '@angular/router' }
            ],
            importComponent: [
                {
                    classname: `${connectorObject.name.charAt(0).toUpperCase() + connectorObject.name.slice(1).toLowerCase()}Service`,
                    path: `./${connectorObject.name.toLowerCase()}-admin.service`
                }
            ],
            importAsteriskDependency: [],
            scriptVariable: [],
            componentVariable: [],
            componentConstructorParams: [],
            componentOnInit: [],
            componentOnAfterView: [],
            componentMethod: []
        }
        temp.componentConstructorParams.push(`private ${temp.folderName}Service: ${connectorObject.name.charAt(0).toUpperCase() + connectorObject.name.slice(1).toLowerCase()}Service`)
        await arrayData.forEach(async (data) => {
            temp.componentVariable.push(`public ${temp.folderName}Data = {`);
            temp.componentMethod.push(`GpCreate() {`)
            temp.componentMethod.push(`this.${temp.folderName}Service.GpCreate(this.${temp.folderName}Data).subscribe(data => {`)
            await Object.keys(data.request.auth).forEach(key => {
                if (typeof (data.request.auth[key]) == "object") {
                    data.request.auth[key].forEach(childData => {
                        temp.componentVariable.push(`${childData.key}: '',`);
                        temp.componentMethod.push(`this.${temp.folderName}Data.${childData.key} = '';`)
                    })
                }
            })
            temp.componentVariable.push(`}`);
            temp.componentMethod.push(`},
            error => {
                console.log('Error', error);
            });
        }`)
        })
        this.frontendSupportWorker.generateFile(applicationPath + connectorObject.name.toLowerCase(), this.templatePath,
        `${connectorObject.name.toLowerCase()}-admin.component.ts`, `connector_admin_component_ts`, temp, (response) => {
        })

    }

    generateConnectorAdminCss(applicationPath, connectorObject) {
        this.frontendSupportWorker.generateFile(applicationPath + connectorObject.name.toLowerCase(), this.templatePath,
            `${connectorObject.name.toLowerCase()}-admin.component.scss`, 'connector_admin_css', null, (response) => {
            })
    }

    generateConnectorAdminHtml(applicationPath, connectorObject, connector_admin_data) {
        this.frontendSupportWorker.generateFile(applicationPath + connectorObject.name.toLowerCase(), this.templatePath,
            `${connectorObject.name.toLowerCase()}-admin.component.html`, 'connector_admin_html',
            connector_admin_data, (response) => {
            })
    }

    getConnectorByProjectId(projectId) {
        return new Promise((resolve, reject) => {
            this.connectorService.getConnectorByProjectId(projectId, (response) => {
                resolve(JSON.parse(response));
            })
        })
    }

    getConnectorById(connectorIds) {
        return new Promise((resolve, reject) => {
            this.connectorService.getConnectorByIds(connectorIds, (response) => {
                resolve(response);
            })
        })
    }

    async modifyFiles() {
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
        await this.frontendSupportWorker.generateFile(appModulePath, this.templatePath,
            this.APP_MODULE_FILENAME, this.MODIFY_APP_MODULE_TEMPLATENAME, this.appModuleInfo, (response) => { });

        // future use of modify app routing file
        await this.frontendSupportWorker.generateFile(appModulePath, this.templatePath,
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


    Getexternalfeature(extfeature) {
        let extfeaturedetails = extfeature;
        let externalfeatureid = extfeaturedetails.externalfeatureconfig;
        return new Promise((resolve, reject) => {
            this.externalfeatureservice.getExternalfeature(externalfeatureid, (response, err) => {
                if (err) {
                    reject(err);
                }
                resolve(JSON.parse(response));
            })
        })
    }


    ExternalfeatureAdmin(adminfeature) {
        let srcpath = adminfeature.Featureadmin.Adminuiimg;
        let filename = srcpath.split('/');
        console.log('---------filename------', filename);
        const fileindex = filename.length - 1;
        let destinationpath = `${this.projectGenerationPath}/src/assets/img/${filename[fileindex]}`;
        console.log('-------&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&--------', srcpath, destinationpath);

        ncp.limit = 16;
        /** 
         * 1st Parameter Source path , 
         * 2nd Parameter Destination path , 
         * 3rd parameter is for override options so that even if the file is present it gets overridden.
        */
        return new Promise((resolve, reject) => {
            ncp(srcpath, destinationpath, { clobber: false }, (err) => {
                if (err) {
                    console.error('---error occured in the ncp of external feature----', err);
                    reject(err);
                }

                let html = {
                    externalfeaturename: adminfeature.featurename,
                    imagename: filename[fileindex],
                    routevalue: 'adminconfig', // For now this been put static but you can change it later dev Kishan for github issue #604
                }
                let renderTemplate = st.loadGroup(require(this.templatePath + `/admin_html_stg`));
                let fileData = renderTemplate.render('admin_html', [html]);
                console.log('--------filedata------', fileData);
                resolve(fileData);
            });

        })


    }
}