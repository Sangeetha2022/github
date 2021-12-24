import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class MicroFlowManagerService {

    getMicroFlowByName(microflowName, callback) {
        new ApiAdapter().get(`${SharedService.apiGatewayURL}/desktop/microflow/getbycomp/${microflowName}`).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}