import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class MicroFlowManagerService {

    getMicroFlowByName(microflowName, callback) {
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/microflow/getbycomp/${microflowName}`).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}