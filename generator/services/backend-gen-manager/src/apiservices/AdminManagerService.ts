import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class AdminManagerService {

    getAdmin(features,projectId,projectgenpath,seedpath, callback) {
        new ApiAdapter().get(`${SharedService.adminmanager}/admin?projectId=${projectId}&seedpath=${seedpath}&features=${features}&projectpath=${projectgenpath}`).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}