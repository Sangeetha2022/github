import { ApiAdaptar } from '../config/ApiAdaptar';
import * as Constants from '../config/Constants';

export class ExternalFeatureService {

    getExternalfeature(externalfeatureid, callback) {
        console.log('get Externalfeature by id ----- ', externalfeatureid);
        new ApiAdaptar().get(
            `${Constants.APIGATEWAYURL}/desktop/externalfeature/get/${externalfeatureid}`,
        ).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}