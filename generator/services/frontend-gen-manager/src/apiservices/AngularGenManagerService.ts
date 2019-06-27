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
}