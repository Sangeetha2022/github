import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class ScreenManagerService {

    getScreenByProjectId(projectId, callback) {
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/screen/getbyprojectid/${projectId}`).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}