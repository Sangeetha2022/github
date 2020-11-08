import { Request } from 'mongoose';
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

export class FrontendTemplateService {
    sharedService = new SharedService();
    screenManagerService = new ScreenManagerService();
    templateManagerService = new TemplateManagerService();
    menuBuilderManagerService = new MenuBuilderManagerService();
    angularTemplateManagerService = new AngularTemplateManagerService();
    authGenManagerService = new AuthGenManagerService();
    adminGenManagerService = new AdminGenManagerService();
    apiAdapter = new ApiAdaptar()
    backend: String;

    public async frontendTemplateProject(req: Request, callback: CallableFunction) {
        const details = req.body;
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
        console.log('-------get template by project-------',details);
        // const templateDetails = await this.getTemplateByProjectId(details.projectId);
        if (details.clientFramework.label.includes('Angular')) {
            const templateDetails = await this.getTemplateByName(details.project.projectTemplatename);

            console.log('template of project are ---- ', util.inspect(templateDetails, { showHidden: true, depth: null }));
            const templateJSON = JSON.parse(templateDetails.toString());
            const menuDetails = await this.getMenuByProjectId(details.projectId);
            const menuJSON = JSON.parse(menuDetails.toString());
            // console.log('menuJSON are ------  ', util.inspect(menuDetails, { showHidden: true, depth: null }));

            templateObj.template = templateJSON.body;
            templateObj.menuBuilder = menuJSON.body;

            try {
                // console.log('before calling angular template');
                const templateResponse = await this.generateAngularTemplate(templateObj);
                console.log('after calling angular template ---  ', templateResponse);
                if (templateResponse) {
                    const tempFrontend = {
                        templateResponse: JSON.parse(JSON.stringify(templateResponse)).body,
                        seedTemplatePath: details.seedTemplatePath,
                        authTemplatePath: details.authTemplatePath,
                        adminTemplatePath: details.project.templateLocation.frontendTemplate,
                        screenMenus: templateObj.menuBuilder

                    }
                    await this.generateAuthFrontendComponent(tempFrontend);
                    console.log('after calling auth gronten component are  ---  ');
                    await this.generateAdminFrontendComponent(tempFrontend);
                }
                callback('angular template are generated');
            } catch (err) {
                console.log('err in generating the angualr template')
                callback('cannot able to generate the angular template');
            }
        }

        if (details.clientFramework.label.includes('React')) {

        }

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

}