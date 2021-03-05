import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class PrivateGithubManagerService {



    pushProjectToPrivaterepo(projectId, gitBody, callback) {
        new ApiAdaptar().post(`${SharedService.apiGatewayURL}/desktop/github/private/deploy/project/${projectId}`, gitBody).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}