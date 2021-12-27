import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/Sharedservice';

export class FeatureManagerservice {

    Createfeature(body,callback) {

        new ApiAdapter().post(`${SharedService.apiGatewayURL}/desktop/feature/save`, body).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })

    }
}