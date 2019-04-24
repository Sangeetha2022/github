import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class FlowManagerService {

    getFlowByName(flowName, callback) {
        console.log('getflow by name ----- ', flowName);
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/flow/get/${flowName}/name`).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}