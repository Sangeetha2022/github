import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class ConfigurationManagerService {

    getAllDetails(callback) {
        new ApiAdapter().get(`${SharedService.apiGatewayURL}/desktop/generation_flow/getall`).then(
            data => {
                console.log('get all config details ---- ', data);
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}