import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class NodeGenManagerService {

    generateNode(details, callback) {
        new ApiAdaptar().post(`${SharedService.apiGatewayURL}/desktop/node/project`, details).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}