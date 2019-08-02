import { Request, Response, response } from 'express';
import { AndroidAppService } from '../services/androidAppService';
import { IosAppService } from '../services/iosAppService';

let androidAppService = new AndroidAppService();
let iosAppService = new IosAppService();
export class IonicAppController {

    public generateIonicApp(req: Request, res: Response) {
        console.log('entering into create inoic app in controller ');

        var projectDetails = req.body;
        // ios
        iosAppService.generateIosApp(projectDetails, (response) => { });
        // android
        if (projectDetails.device_type == 'android') {
            androidAppService.generateAndroidApp(projectDetails, (response) => {
                res.status(200);
                res.json(response);
            })
        }

        // if (projectDetails.device_type == 'ios') {

        // }

    }
}