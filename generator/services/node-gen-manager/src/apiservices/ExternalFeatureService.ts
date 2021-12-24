import { ApiAdapter } from '../config/ApiAdapter';
import * as Constants from '../config/Constants';

export class ExternalFeatureService {

    getExternalfeature(externalfeatureid, callback) {
        console.log('get Externalfeature by id ----- ', externalfeatureid);
        new ApiAdapter().get(
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