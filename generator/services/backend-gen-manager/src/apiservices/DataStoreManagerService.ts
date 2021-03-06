import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class DataStoreManagerService {

    getDataStore(data, callback) {
        new ApiAdapter().post(`${SharedService.apiGatewayURL}/desktop/datastore/project`, data).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}