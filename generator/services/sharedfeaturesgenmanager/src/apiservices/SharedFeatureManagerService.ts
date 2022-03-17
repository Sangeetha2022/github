import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class SharedFeatureManagerService {

    async sharedFeatureGenClient(featureData, callback) {
        console.log(`${SharedService.apiGatewayURL}/desktop/gfc/get/search/?feature_name=${featureData}`);
        await new ApiAdapter().get(`${SharedService.apiGatewayURL}/desktop/gfc/get/search/?feature_name=${featureData}`).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}