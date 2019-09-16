import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class ProjectManagerService {

    public deleteProjectById(projectid, callback) {
        const projectId = projectid;
        new ApiAdaptar().delete(`${SharedService.apiGatewayURL}/desktop/projects/delete/${projectId}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }
}