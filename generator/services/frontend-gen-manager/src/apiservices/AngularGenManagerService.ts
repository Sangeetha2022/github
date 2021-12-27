import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class AngularGenManagerService {

    generateAngular(details, callback) {
        new ApiAdapter().post(`${SharedService.apiGatewayURL}/desktop/angular/project`, details).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
    generateAngularV12(details, callback) {
        new ApiAdapter().post(`${SharedService.apiGatewayURL}/desktop/angularv12/project`, details).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
    generateAngularV13(details, callback) {
        new ApiAdapter().post(`${SharedService.apiGatewayURL}/desktop/angularv13/project`, details).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}