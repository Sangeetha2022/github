import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class MicroFlowManagerService {

    getMicroFlows(microFlowIDs, callback) {
        new ApiAdapter().post(`${SharedService.apiGatewayURL}/desktop/microflow/project/component/get`, microFlowIDs).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}