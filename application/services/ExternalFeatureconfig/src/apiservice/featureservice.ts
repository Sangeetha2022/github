import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/Sharedservice';

export class FeatureManagerservice {

    Createfeature(body,callback) {

        new ApiAdaptar().post(`${SharedService.apiGatewayURL}/desktop/feature/save`, body).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })

    }
}