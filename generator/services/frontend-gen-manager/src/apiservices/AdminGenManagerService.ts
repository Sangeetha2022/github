import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class AdminGenManagerService {

    generateAdminComponent(details, callback) {
        new ApiAdapter().post(`${SharedService.adminURL}/admin/frontend`, details).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}