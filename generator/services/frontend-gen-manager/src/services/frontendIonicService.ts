import { Request } from 'express';
import { Common } from '../config/Common';
import { Constant } from '../config/Constant';
import { IonicManagerService } from '../apiservices/IonicManagerService';
import { ScreenManagerService } from '../apiservices/ScreenManagerService';
import { TemplateManagerService } from '../apiservices/TemplateManagerService';



export class FrontendIonicService {

    private screenManager = new ScreenManagerService();
    templateManagerService = new TemplateManagerService();
    private ionicManagerService = new IonicManagerService();

    public templateScreenName: any;

    public async generateIonicTemplate(req: Request, callback: CallableFunction) {
        console.log('i am ionic service');
        const details = req.body;
        Common.createFolders(details.projectGenerationPath);
        const projectGenerationPath = `${details.projectGenerationPath}/${Constant.MOBILE_FOLDERNAME}`;
        // const template = await this.getTemplateName(details.projectId);
        const template = await this.getTemplateByName(details.project.projectTemplatename);

        const screen = JSON.parse(template.toString());
        console.log('screename --------------', screen);
        const ionicObj = {
            device_type: 'android',
            projectId: details.projectId,
            sharedUrl: details.sharedUrl,
            apigatewayPortNumber: details.apigatewayPortNumber,
            projectGenerationPath: projectGenerationPath,
            project: details.project,
            templateName: screen.body.template_name,
            template: null,
            menuBuilder: null
        }

        console.log('--ionic object---->>>', ionicObj);
        const ionicResponse = await this.generateIonicApp(ionicObj);
        callback(ionicResponse);
    }

    getTemplateName(projectId) {
        return new Promise(resolve => {
            this.screenManager.getTemplateByProjectId(projectId, (data) => {
                resolve(data)
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


    generateIonicApp(ionicObj) {
        return new Promise(resolve => {
            this.ionicManagerService.generateIonicTemplate(ionicObj, (data) => {
                resolve(data);
            })
        })
    }
}