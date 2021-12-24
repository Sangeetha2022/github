import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class MongoGenManagerService {

    getMongo(details, callback) {
        new ApiAdapter().post(`${SharedService.apiGatewayURL}/desktop/mongoose/project`, details).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}