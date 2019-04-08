import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class FeatureManagerService {

    getFeatureByProjectId(projectId, callback) {
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/feature/getbyprojectid/${projectId}`).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    getDetailByFeatureId(featureId, callback) {
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/feature/details/getbyfeatureid/${featureId}`).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}