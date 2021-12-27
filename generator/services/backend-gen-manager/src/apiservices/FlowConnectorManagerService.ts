import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class FlowConnectorManagerService {

    getConnectorByProjectId(projectId, callback) {
        new ApiAdapter().get(
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
        new ApiAdapter().post(
            `${SharedService.apiGatewayURL}/desktop/get/connectorsbyids`, connectorIds).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    getFileByIds(fileIds, callback) {
        new ApiAdapter().post(
            `${SharedService.apiGatewayURL}/desktop/getattachment`, fileIds).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}