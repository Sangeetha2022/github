import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class CodeGenManagerService {

    createProjectCode(projectid, details, callback) {
        new ApiAdaptar().put(
            `${SharedService.apiGatewayURL}/desktop/generate/code?projectid=${projectid}`, details
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