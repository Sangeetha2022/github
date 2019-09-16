import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class FlowManagerService {

    getProjectFlows(projectFlowsId, callback) {
        new ApiAdaptar().post(`${SharedService.apiGatewayURL}/desktop/flow/projectfeature/get`, projectFlowsId).then(
            data => {
                console.log('backend flow response ---- ', data);
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    getFlowsByLanguage(flowIDS, language, callback) {
        new ApiAdaptar().post(`${SharedService.apiGatewayURL}/desktop/flow/feature/language/get?language=${language}`, flowIDS).then(
            data => {
                console.log('backend flow response ---- ', data);
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}