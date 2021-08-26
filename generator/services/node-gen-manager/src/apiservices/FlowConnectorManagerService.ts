import { ApiAdaptar } from '../config/ApiAdaptar';
import * as Constants from '../config/Constants';
import { SharedService } from '../config/SharedService'

export class FlowConnectorManagerService {

    getConnectorByProjectId(projectId, callback) {
        new ApiAdaptar().get(
            `${Constants.APIGATEWAYURL}/desktop/projects/getbyid/${projectId}`,
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
            `${Constants.APIGATEWAYURL}/desktop/get/connectorsbyids`, connectorIds).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    getFileByIds(fileIds, callback) {
        new ApiAdaptar().post(
            `${Constants.APIGATEWAYURL}/desktop/getattachment`, fileIds).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}