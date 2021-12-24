import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class FeatureManagerService {

    getFeatureByProjectId(projectId, callback) {
        new ApiAdapter().get(`${SharedService.apiGatewayURL}/desktop/feature/project/get?projectId=${projectId}`).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    // getDetailByFeatureId(featureId, callback) {
    //     new ApiAdapter().get(`${SharedService.apiGatewayURL}/desktop/feature/details/getbyfeatureid/${featureId}`).then(
    //         data => {
    //             console.log('i am the data u r expecting======', data);
    //             callback(data);
    //         }
    //     ).catch(error => {
    //         callback(error);
    //     })
    // }

    // getAllFeatureFlowByFeatureId(featureId, callback) {
    //     new ApiAdapter().get(`${SharedService.apiGatewayURL}/desktop/feature-flow/getbyfeatureid/${featureId}`).then(
    //         data => {
    //             console.log('i am the data u r expecting======', data);
    //             callback(data);
    //         }
    //     ).catch(error => {
    //         callback(error);
    //     })
    // }
}