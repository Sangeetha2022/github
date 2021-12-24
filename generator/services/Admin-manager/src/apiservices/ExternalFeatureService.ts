import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class ExternalFeatureService {

    getExternalfeature(externalfeatureid, callback) {
        console.log('get Externalfeature by id ----- ', externalfeatureid , SharedService.apiGatewayURL);
        new ApiAdapter().get(
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