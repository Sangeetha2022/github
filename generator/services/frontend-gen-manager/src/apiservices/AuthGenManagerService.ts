import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class AuthGenManagerService {

    generateAuthFrontendComponent(details, callback) {
        console.log('generte auth frontend in frontend manager ----  ', `${SharedService.authURL}/auth/frontend`)
        console.log('generte auth frontend in frontend manager --details--  ', details);
        new ApiAdaptar().post(`${SharedService.authURL}/auth/frontend`, details).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}