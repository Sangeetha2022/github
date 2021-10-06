import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';
// import * as Constants from '../config/Constants';

export class SefNodeGenManagerService {

    generateSefNode(details, callback) {
        console.log('details------------', details, `${SharedService.apiGatewayURL}/desktop/sefnode/project`);
        new ApiAdaptar().post(`${SharedService.apiGatewayURL}/desktop/sefnode/project`, details).then(
            data => {
                console.log('node response from sef', data);
                callback(data);
                //callback({ Message: 'Default feature sefnode' });
            }
        ).catch(error => {
            callback(error);
        })
    }

    generateApiGateway(details, callback) {
        new ApiAdaptar().post(`${SharedService.apiGatewayURL}/desktop/sefnode/apigateway/project`, details).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}