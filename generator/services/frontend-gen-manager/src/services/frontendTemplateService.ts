import { Request } from 'mongoose';
import * as fs from 'fs';
import { SharedService } from '../config/SharedService';
import { ApiAdaptar } from '../config/ApiAdaptar';
import { MicroFlowManagerService } from '../apiservices/MicroFlowManagerService';
import { AngularGenManagerService } from '../apiservices/AngularGenManagerService';
import * as util from 'util';
import * as path from 'path';
import * as asyncLoop from 'node-async-loop';
import { ScreenManagerService } from '../apiservices/ScreenManagerService';
import { Common } from '../config/Common';
import { MenuBuilderManagerService } from '../apiservices/MenuBuilderManagerService';
import { AngularTemplateManagerService } from '../apiservices/AngularTemplateManagerService';

export class FrontendTemplateService {
    private desktopScreenName = 'desktop';
    private mobileScreenName = 'mobile';
    private angular7Name = 'angular7';
    sharedService = new SharedService();
    // angularGenManagerService = new AngularGenManagerService();
    // microFlowService = new MicroFlowManagerService();
    screenManagerService = new ScreenManagerService();
    menuBuilderManagerService = new MenuBuilderManagerService();
    angularTemplateManagerService = new AngularTemplateManagerService();
    apiAdapter = new ApiAdaptar()
    backend: String;

    public async frontendTemplateProject(req: Request, callback: CallableFunction) {
        const details = req.body;
        const projectGenerationPath = `${details.project.projectGenerationPath}/${details.project.name}/frontend`;
        Common.createFolders(projectGenerationPath);
        console.log('create project template vluae are -----------   ', details);
       const templateObj = {
            projectId: details.projectId,
            sharedUrl: details.sharedUrl,
            apigatewayPortNumber: details.apigatewayPortNumber,
            projectGenerationPath: details.projectGenerationPath,
            project: details.project,
            template: null,
            menuBuilder: null
        }
        const screenDetails = await this.getScreenByProjectId(details.projectId);
        console.log('screens project are ---- ', util.inspect(screenDetails, { showHidden: true, depth: null }));
        const screenJSON = JSON.parse(screenDetails.toString());
        console.log('json screens ttest are ---- ', screenJSON);
        let templateJSON = null;
        if (screenJSON) {
            templateJSON = screenJSON.body.filter((data) => {
                return data.isTemplate === true;
            })
        }
        const menuDetails = await this.getMenuByProjectId(details.projectId);
        const menuJSON = JSON.parse(menuDetails.toString());
        console.log('menuJSON are ------  ', menuJSON);

        templateObj.template = templateJSON;
        templateObj.menuBuilder = menuJSON.body;
        try {
            console.log('before calling angular template');
            await this.generateAngularTemplate(templateObj);
            console.log('after calling angular template')
            callback('angular template are generated');
        } catch (err) {
            console.log('err in generating the angualr template')
            callback('cannot able to generate the angular template');
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

    getScreenByProjectId(projectId) {
        return new Promise(resolve => {
            this.screenManagerService.getScreenByProjectId(projectId, (data) => {
                resolve(data);
            })
        })
    }

}