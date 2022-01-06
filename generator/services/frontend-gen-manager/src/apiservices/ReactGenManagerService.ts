import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class ReactGenManagerService {

    generateReact(details, callback) {
        new ApiAdaptar().post(`${SharedService.apiGatewayURL}/desktop/react/project`, details).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}