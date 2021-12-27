import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class PrivateGithubManagerService {



    pushProjectToPrivaterepo(projectId, gitBody, callback) {
        new ApiAdapter().post(`${SharedService.apiGatewayURL}/desktop/github/private/deploy/project/${projectId}`, gitBody).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}