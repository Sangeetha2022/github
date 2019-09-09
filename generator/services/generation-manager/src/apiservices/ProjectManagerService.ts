import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class ProjectManagerService {

    getProjectByUserId(userId, callback) {
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/projects/getbyid/${userId}`).then(
            data => {
                console.log('get project by user id are ---- ', data);
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    getProjectById(projectId, callback) {
        console.log('project manager service of id ------ ', projectId);
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/projects/getbyid/${projectId}`).then(
            data => {
                console.log('get project are ---- ', data);
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}