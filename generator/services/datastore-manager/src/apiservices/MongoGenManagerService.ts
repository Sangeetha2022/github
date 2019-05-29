import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class MongoGenManagerService {

    getMongo(details, callback) {
        new ApiAdaptar().post(`${SharedService.apiGatewayURL}/desktop/mongoose/project`, details).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}