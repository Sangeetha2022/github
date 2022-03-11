import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class SharedFeatureGenManagerService {

    sharedFeatureGenClient(featureData, callback) {
        console.log(`${SharedService.apiGatewayURL}/desktop/gfcclient`);
        new ApiAdapter().post(`${SharedService.apiGatewayURL}/desktop/gfcclient`, featureData).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    sharedFeatureGenService(featureData, callback) {
        console.log(`${SharedService.apiGatewayURL}/desktop/gfcservice`);
        new ApiAdapter().post(`${SharedService.apiGatewayURL}/desktop/gfcservice`, featureData).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}