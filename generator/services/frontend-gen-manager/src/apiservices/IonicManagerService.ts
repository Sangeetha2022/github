import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class IonicManagerService {

    generateIonicTemplate(details, callback) {
        new ApiAdaptar().post(`${SharedService.ionicURL}/generate/ionic`, details).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}