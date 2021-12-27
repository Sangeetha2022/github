import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class CodeGenManagerService {

    createProjectCode(projectId, details, callback) {
        new ApiAdapter().put(
            `${SharedService.apiGatewayURL}/desktop/generate/code?projectId=${projectId}`, details
        ).then(
            data => {
                console.log('create project code ---- ', data);
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}