import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class AngularGenManagerService {

    generateAngular(details, callback) {
        new ApiAdaptar().post(`${SharedService.apiGatewayURL}/desktop/angular/project`, details).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
    generateAngularV12(details, callback) {
        new ApiAdaptar().post(`${SharedService.apiGatewayURL}/desktop/angularv12/project`, details).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}