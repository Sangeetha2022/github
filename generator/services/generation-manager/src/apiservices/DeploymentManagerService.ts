import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class DeploymentManagerService {

    generateDeployment(projectId, details, callback) {
        new ApiAdapter().post(
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