import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class ExternalFeatureService {

    getExternalfeature(externalfeatureid, callback) {
        console.log('get Externalfeature by id ----- ', externalfeatureid , SharedService.apiGatewayURL);
        new ApiAdaptar().get(
            `${SharedService.apiGatewayURL}/desktop/externalfeature/get/${externalfeatureid}`,
        ).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}