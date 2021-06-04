import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class ConnectorService {

    getConnectorByProjectId(projectId, callback) {
        new ApiAdaptar().get(
            `${SharedService.apiGatewayURL}/desktop/projects/getbyid/${projectId}`,
        ).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    getConnectorByIds(connectorIds, callback) {
        new ApiAdaptar().post(
            `${SharedService.apiGatewayURL}/desktop/get/connectorsbyids`, connectorIds).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    getFileByIds(fileIds, callback) {
        new ApiAdaptar().post(
            `${SharedService.apiGatewayURL}/desktop/getattachment`, fileIds).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}