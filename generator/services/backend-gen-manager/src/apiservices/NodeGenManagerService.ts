import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class NodeGenManagerService {

    generateNode(details, callback) {
        new ApiAdapter().post(`${SharedService.apiGatewayURL}/desktop/node/project`, details).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    generateApiGateway(details, callback) {
        new ApiAdapter().post(`${SharedService.apiGatewayURL}/desktop/node/apigateway/project`, details).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}