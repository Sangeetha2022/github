import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class MicroFlowManagerService {

    getMicroFlows(microFlowIDs, callback) {
        new ApiAdaptar().post(`${SharedService.apiGatewayURL}/desktop/microflow/project/component/get`, microFlowIDs).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}