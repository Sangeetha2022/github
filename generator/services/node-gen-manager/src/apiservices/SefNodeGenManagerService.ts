import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';
import * as Constants from '../config/Constants';

export class NodeGenManagerService {

    generateSefNode(details, callback) {
        console.log('details------------', details, `${Constants.APIGATEWAYURL}/desktop/sefnode/project`);
        new ApiAdapter().post(`${Constants.APIGATEWAYURL}/desktop/sefnode/project`, details).then(
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
        new ApiAdapter().post(`${Constants.APIGATEWAYURL}/desktop/sefnode/apigateway/project`, details).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}