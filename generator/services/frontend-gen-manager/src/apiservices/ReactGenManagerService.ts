import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class ReactGenManagerService {

    generateReact(details, callback) {
        new ApiAdapter().post(`${SharedService.apiGatewayURL}/desktop/react/project`, details).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}