import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class ScreenManagerService {

    public deleteProjectScreen(projectid, callback) {
        const projectId = projectid;
        new ApiAdaptar().delete(`${SharedService.apiGatewayURL}/desktop/screen/deletebyproject/${projectId}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

    public deletetScreenById(screenid, callback) {
        const screenId = screenid;
        new ApiAdaptar().delete(`${SharedService.apiGatewayURL}/desktop/screen/delete/${screenId}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }
}