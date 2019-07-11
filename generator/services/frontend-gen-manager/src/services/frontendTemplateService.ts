import { Request } from 'mongoose';
import { SharedService } from '../config/SharedService';
import { ApiAdaptar } from '../config/ApiAdaptar';
import * as util from 'util';
import { ScreenManagerService } from '../apiservices/ScreenManagerService';
import { Common } from '../config/Common';
import { MenuBuilderManagerService } from '../apiservices/MenuBuilderManagerService';
import { AngularTemplateManagerService } from '../apiservices/AngularTemplateManagerService';
import { Constant } from '../config/Constant';

export class FrontendTemplateService {
    sharedService = new SharedService();
    screenManagerService = new ScreenManagerService();
    menuBuilderManagerService = new MenuBuilderManagerService();
    angularTemplateManagerService = new AngularTemplateManagerService();
    apiAdapter = new ApiAdaptar()
    backend: String;

    public async frontendTemplateProject(req: Request, callback: CallableFunction) {
        const details = req.body;
        Common.createFolders(details.projectGenerationPath);
        const projectGenerationPath = `${details.projectGenerationPath}/${Constant.DESKTOP_FOLDERNAME}`;
        console.log('create project template vluae are -----------   ', details);
       const templateObj = {
            projectId: details.projectId,
            sharedUrl: details.sharedUrl,
            apigatewayPortNumber: details.apigatewayPortNumber,
            projectGenerationPath: projectGenerationPath,
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
        console.log('menuJSON are ------  ', util.inspect(menuDetails, { showHidden: true, depth: null }));

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