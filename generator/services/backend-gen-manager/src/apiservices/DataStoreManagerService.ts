import { ApiAdaptar } from '../../../code-gen-manager/src/config/ApiAdaptar';
import { SharedService } from '../../../code-gen-manager/src/config/SharedService';

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