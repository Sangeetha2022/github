import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class AdminGenManagerService {

    generateAdminComponent(details, callback) {
        new ApiAdaptar().post(`${SharedService.adminURL}/admin/frontend`, details).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}