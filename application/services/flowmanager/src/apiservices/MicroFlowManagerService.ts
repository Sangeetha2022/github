import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class MicroFlowManagerService {

    getMicroFlows(microFlowIDs, callback) {
        new ApiAdapter().post(`${SharedService.apiGatewayURL}/desktop/microflow/component/get`, microFlowIDs).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    getProjectMicroFlows(microFlowIDs, callback) {
        new ApiAdapter().post(`${SharedService.apiGatewayURL}/desktop/microflow/project/component/get`, microFlowIDs).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    saveBulkMicroFlows(microFlowArray, callback) {
        new ApiAdapter().post(`${SharedService.apiGatewayURL}/desktop/microflow/project/save`, microFlowArray).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    updateProjectMicroFlow(microFlowArray, callback) {
        new ApiAdapter().put(`${SharedService.apiGatewayURL}/desktop/microflow/project/update`, microFlowArray).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}