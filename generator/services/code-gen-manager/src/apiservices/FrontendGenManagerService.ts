
import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';


export class FrontendGenManagerService {

    FrontendGenProject(data, callback) {
        new ApiAdaptar().post(`${SharedService.apiGatewayURL}/desktop/frontend/project`, data).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}