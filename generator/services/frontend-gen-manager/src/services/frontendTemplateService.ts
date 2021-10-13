import { Request } from 'express';
import * as fs from 'fs';
import { SharedService } from '../config/SharedService';
import { ApiAdaptar } from '../config/ApiAdaptar';
import * as util from 'util';
import { ScreenManagerService } from '../apiservices/ScreenManagerService';
import { Common } from '../config/Common';
import { MenuBuilderManagerService } from '../apiservices/MenuBuilderManagerService';
import { AngularTemplateManagerService } from '../apiservices/AngularTemplateManagerService';
import { Constant } from '../config/Constant';
import { AuthGenManagerService } from '../apiservices/AuthGenManagerService';
import { AdminGenManagerService } from '../apiservices/AdminGenManagerService';
import { TemplateManagerService } from '../apiservices/TemplateManagerService';
import { ReactGenManagerService } from '../apiservices/ReactGenManagerService'

export class FrontendTemplateService {
    sharedService = new SharedService();
    screenManagerService = new ScreenManagerService();
    templateManagerService = new TemplateManagerService();
    menuBuilderManagerService = new MenuBuilderManagerService();
    angularTemplateManagerService = new AngularTemplateManagerService();
    authGenManagerService = new AuthGenManagerService();
    adminGenManagerService = new AdminGenManagerService();
    reactgenManagerService = new ReactGenManagerService();
    apiAdapter = new ApiAdaptar()
    backend: String;

    public async frontendTemplateProject(req: Request, callback: CallableFunction) {
        const details = req.body;
        console.log("frontendTemplateProject details==>",details);
        
        Common.createFolders(details.projectGenerationPath);
        const projectGenerationPath = `${details.projectGenerationPath}/${Constant.DESKTOP_FOLDERNAME}`;
        // console.log('create project template vluae are -----------   ', details);
        const templateObj = {
            projectId: details.projectId,
            sharedUrl: details.sharedUrl,
            apigatewayPortNumber: details.apigatewayPortNumber,
            projectGenerationPath: projectGenerationPath,
            project: details.project,
            template: null,
            menuBuilder: null
        }
        console.log('-------get template by project-------', details);
        console.log('details from as per', details.project.clientFramework.label.includes('React'));
        // const templateDetails = await this.getTemplateByProjectId(details.projectId);
        // const templateDetails = await this.getTemplateByName(details.project.projectTemplatename);
        const templateData = await this.getTemplateByProject(details.projectId);
        console.log('template of project are ---- ', util.inspect(templateData, { showHidden: true, depth: null }));
        const templateJSON = JSON.parse(templateData.toString());
        const menuDetails = await this.getMenuByProjectId(details.projectId);
        const menuJSON = JSON.parse(menuDetails.toString());
        // console.log('menuJSON are ------  ', util.inspect(menuDetails, { showHidden: true, depth: null }));

        templateObj.template = templateJSON.body;
        templateObj.menuBuilder = menuJSON.body;

        try {
            // console.log('before calling angular template');
            if (details.project.clientFramework.label == 'Angular 12') {
                console.log("inside angular 12 templatemanager frontend");
                const templateResponse = await this.generateAngularTemplateV12(templateObj);
                console.log('after calling angular template for version 12 ---  ', templateResponse);
                if (templateResponse) {
                    const tempFrontend = {
                        templateResponse: JSON.parse(JSON.stringify(templateResponse)).body,
                        seedTemplatePath: details.seedTemplatePath +'/AngularV12',
                       // seedTemplatePath: details.seedTemplatePath,
                        authTemplatePath: details.authTemplatePath,
                        adminTemplatePath: details.project.templateLocation.frontendTemplate,
                        screenMenus: templateObj.menuBuilder,
                        project_id: details.projectId

                    }
                    console.log("tempFrontend===",tempFrontend);
                    
                    let featurevalue = details.feature.body[0];
                    console.log('------feature-----', featurevalue);
                    if (featurevalue) {
                        if (featurevalue.type === 'external') {
                            tempFrontend['externalfeature'] = featurevalue;
                        }
                    }
                    console.log('-----external feature value-----', tempFrontend);
                    await this.generateAuthFrontendComponent(tempFrontend);
                    console.log('after calling auth gronten component are  ---  ');
                    await this.generateAdminFrontendComponent(tempFrontend);
                }
                callback('angular template are generated');

            }
            if (details.project.clientFramework.label.includes('Angular') && details.project.clientFramework.label != 'Angular 12') {
                const templateResponse = await this.generateAngularTemplate(templateObj);
                console.log('after calling angular template ---  ', templateResponse);
                if (templateResponse) {
                    const tempFrontend = {
                        templateResponse: JSON.parse(JSON.stringify(templateResponse)).body,
                        seedTemplatePath: details.seedTemplatePath,
                        authTemplatePath: details.authTemplatePath,
                        adminTemplatePath: details.project.templateLocation.frontendTemplate,
                        screenMenus: templateObj.menuBuilder,
                        project_id: details.projectId

                    }
                    let featurevalue = details.feature.body[0];
                    console.log('------feature-----', featurevalue);
                    if (featurevalue) {
                        if (featurevalue.type === 'external') {
                            tempFrontend['externalfeature'] = featurevalue;
                        }
                    }
                    console.log('-----external feature value-----', tempFrontend);
                    await this.generateAuthFrontendComponent(tempFrontend);
                    console.log('after calling auth gronten component are  ---  ');
                    await this.generateAdminFrontendComponent(tempFrontend);
                }
                callback('angular template are generated');
            }
            if (details.project.clientFramework.label.includes('React')) {
                const generationPath = details.projectGenerationPath.split("/application");
                const readmepath = details.project.templateLocation.adminManagerTemplatePath + '/readMe'
                let response = await this.generateReact(templateObj);
                this.generate_readme(generationPath, readmepath)
                callback(response);
            }

        } catch (err) {
            console.log('err in generating the angualr template')
            callback('cannot able to generate the angular template');
        }

    }

    generateReact(details) {
        return new Promise(resolve => {
            console.log('entering to the generate react app--------->>>');
            this.reactgenManagerService.generateReact(details, (data) => {
                resolve(data);
            })
        })
    }

    //readme generation for react
    generate_readme(generationPath, readmepath) {
        fs.readFile(`${readmepath}/react_README.md`, 'utf8', (err, result) => {
            fs.writeFile(generationPath[0] + `/README.md`, result, (err) => {
                console.log("eroor----", err)
                if (err) throw err;
                console.log('README.md for react is generated');
            })
        })
    }


    getMenuByProjectId(projectId) {
        return new Promise(resolve => {
            this.menuBuilderManagerService.getMenuByProjectId(projectId, (data) => {
                resolve(data);
            })
        })
    }

    generateAngularTemplate(details) {
        return new Promise(resolve => {
            this.angularTemplateManagerService.generateAngularTemplate(details, (data) => {
                resolve(data);
            });
        })
    }
    generateAngularTemplateV12(details) {
        return new Promise(resolve => {
            this.angularTemplateManagerService.generateAngularTemplateV12(details, (data) => {
                resolve(data);
            });
        })
    }

    generateAuthFrontendComponent(details) {
        return new Promise(resolve => {
            this.authGenManagerService.generateAuthFrontendComponent(details, (data) => {
                resolve(data);
            });
        })
    }

    generateAdminFrontendComponent(details) {
        return new Promise(resolve => {
            this.adminGenManagerService.generateAdminComponent(details, (data) => {
                resolve(data);
            });
        })
    }

    getScreenByProjectId(projectId) {
        return new Promise(resolve => {
            this.screenManagerService.getScreenByProjectId(projectId, (data) => {
                console.log('data---screen---')
                resolve(data);
            })
        })
    }

    getTemplateByProjectId(projectId) {
        return new Promise(resolve => {
            this.screenManagerService.getTemplateByProjectId(projectId, (data) => {
                resolve(data);
            })
        })
    }

    getTemplateByName(templateName) {
        return new Promise(resolve => {
            this.templateManagerService.getTemplateByName(templateName, (data) => {
                resolve(data);
            })
        })
    }

    getTemplateByProject(projectId) {
        return new Promise(resolve => {
            this.templateManagerService.getTemplateByProject(projectId, (data) => {
                resolve(data);
            })
        })
    }

}