import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class ScreenManagerService {

    getScreens(featureId, callback) {
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/screen/getbyfeatureid/${featureId}`).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}