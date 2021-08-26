import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class MicroFlowManagerService {

    public deleteProjectFlowCompMicroFlowsByIds(req, microFlowIds, callback) {
        new ApiAdaptar().post(`${SharedService.apiGatewayURL}/desktop/microflow/project/delete`, microFlowIds).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

    
}