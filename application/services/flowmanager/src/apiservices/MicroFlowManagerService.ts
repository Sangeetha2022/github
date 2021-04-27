import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class MicroFlowManagerService {

    getMicroFlows(microFlowIDs, callback) {
        new ApiAdaptar().post(`${SharedService.apiGatewayURL}/desktop/microflow/component/get`, microFlowIDs).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    saveBulkMicroFlows(microFlowArray, callback) {
        new ApiAdaptar().post(`${SharedService.apiGatewayURL}/desktop/microflow/project/save`, microFlowArray).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}