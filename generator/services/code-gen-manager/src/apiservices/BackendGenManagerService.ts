
import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';


export class BackendGenManagerService {

    BackendGenProject(data, callback) {
        new ApiAdapter().post(`${SharedService.apiGatewayURL}/desktop/backend/project`, data).then(
            data => {
                console.log('before call backendGen project -----   ', data);
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    generateApiGateway(data, callback) {
        new ApiAdapter().post(`${SharedService.apiGatewayURL}/desktop/backend/apigateway/project`, data).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    backendAdminManager(data,callback){
        new ApiAdapter().post(`${SharedService.backendmanagerURL}/backend/adminmanager`,data).then(
            data =>{
                callback(data);
            }
        ).catch(error =>{
            callback(error);
        });
    }
}