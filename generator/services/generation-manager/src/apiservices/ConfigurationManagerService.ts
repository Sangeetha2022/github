import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class ConfigurationManagerService {

    getAllDetails(callback) {
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/generation_flow/getall`).then(
            data => {
                console.log('get all config details ---- ', data);
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}