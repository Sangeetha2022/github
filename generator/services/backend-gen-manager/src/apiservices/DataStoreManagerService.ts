import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class DataStoreManagerService {

    getDataStore(data, callback) {
        new ApiAdaptar().post(`${SharedService.apiGatewayURL}/desktop/datastore/project`, data).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}