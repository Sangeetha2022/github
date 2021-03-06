import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class GithubManagerService {

    pushProject(projectId, gitBody, callback) {
        new ApiAdapter().post(`${SharedService.apiGatewayURL}/desktop/github/deploy/project/${projectId}`, gitBody).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}