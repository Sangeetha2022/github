import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class DeploymentManagerService {

    generateDeployment(projectId, details, callback) {
        new ApiAdaptar().post(
            `${SharedService.deploymentURL}/generate/deployment/${projectId}`, details
        ).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}