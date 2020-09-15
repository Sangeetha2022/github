import { ApiAdaptar } from '../config/ApiAdaptar';
import * as Constants from '../config/Constants';

export class SwaggerGenManagerService {

    createSwaggerFile(details, callback) {
        new ApiAdaptar().post(
            `${Constants.APIGATEWAYURL}/desktop/swagger/create`, details
        ).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}