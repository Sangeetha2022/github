import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class ScreenManagerService {

    getScreenByFeatureId(featureId, callback) {
        new ApiAdapter().get(`${SharedService.apiGatewayURL}/desktop/screen/getbyfeatureid/${featureId}`).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    getScreenByProjectId(projectId, callback) {
        new ApiAdapter().get(`${SharedService.apiGatewayURL}/desktop/screen/getbyprojectid/${projectId}`).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    getTemplateByProjectId(projectId, callback) {
        console.log('template project id are ----  ', projectId);
        new ApiAdapter().get(`${SharedService.apiGatewayURL}/desktop/screen/template?projectId=${projectId}`).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}