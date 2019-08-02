import { Request } from 'mongoose';
import { Common } from '../config/Common';
import { Constant } from '../config/Constant';
import { IonicManagerService } from '../apiservices/IonicManagerService';


export class FrontendIonicService {

    private ionicManagerService = new IonicManagerService();

    public async generateIonicTemplate(req: Request, callback: CallableFunction) {
        const details = req.body;
        Common.createFolders(details.projectGenerationPath);
        const projectGenerationPath = `${details.projectGenerationPath}/${Constant.MOBILE_FOLDERNAME}`;
        const ionicObj = {
            device_type: 'android',
            projectId: details.projectId,
            sharedUrl: details.sharedUrl,
            apigatewayPortNumber: details.apigatewayPortNumber,
            projectGenerationPath: projectGenerationPath,
            project: details.project,
            template: null,
            menuBuilder: null
        }
        const ionicResponse = await this.generateIonicApp(ionicObj);
        console.log('ionic response ------>>>> ', ionicResponse);
        callback(ionicResponse);
    }

    generateIonicApp(ionicObj) {
        return new Promise(resolve => {
            this.ionicManagerService.generateIonicTemplate(ionicObj, (data) => {
                resolve(data);
            })
        })
    }
}