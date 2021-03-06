import { ApiAdapter } from '../config/ApiAdapter';
import * as Constants from '../config/Constants';

export class SwaggerGenManagerService {

    createSwaggerFile(details, callback) {
        new ApiAdapter().post(
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