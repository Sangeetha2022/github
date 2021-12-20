import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class SefFrontendManagerServices {

    generateDefaultServices(details, language, callback) {
        console.log('data come from api seffrontend-------------------------------------->', `${SharedService.apiGatewayURL}/desktop/${language}/project`, details)
        new ApiAdaptar().post(`${SharedService.apiGatewayURL}/desktop/${language}/project`, details).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}