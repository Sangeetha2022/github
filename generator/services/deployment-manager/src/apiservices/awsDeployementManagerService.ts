import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class DeploymentManagerService {

    aws_deployment_live(details, callback) {
        new ApiAdaptar().post(`${SharedService.aws_deploymentURL}/generate/aws-deployment/live/githubaction`, details).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
    aws_deployment_local(details, callback) {
        new ApiAdaptar().post(`${SharedService.aws_deploymentURL}/generate/aws-deployment/local/githubaction`, details).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}