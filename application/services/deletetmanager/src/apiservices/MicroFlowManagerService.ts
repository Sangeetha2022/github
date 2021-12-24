import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class MicroFlowManagerService {

    public deleteProjectFlowCompMicroFlowsByIds(req, microFlowIds, callback) {
        new ApiAdapter().post(`${SharedService.apiGatewayURL}/desktop/microflow/project/delete`, microFlowIds).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

    
}