import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class IonicManagerService {

    generateIonicTemplate(details, callback) {
        new ApiAdapter().post(`${SharedService.ionicURL}/generate/ionic`, details).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}