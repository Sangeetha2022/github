
import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';


export class FrontendGenManagerService {

    FrontendGenProject(data, callback) {
        console.log('calling frontend generation manager -----  ', `${SharedService.apiGatewayURL}/desktop/frontend/project`, data);
        new ApiAdapter().post(`${SharedService.apiGatewayURL}/desktop/frontend/project`, data).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }


    FrontendTemplateProject(data, callback) {
        console.log('calling frontend template manager ----- ', `${SharedService.apiGatewayURL}/desktop/frontend/template/project`);
        new ApiAdapter().post(`${SharedService.apiGatewayURL}/desktop/frontend/template/project`, data).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    FrontendIonicTemplateProject(data, callback) {
        new ApiAdapter().post(`${SharedService.apiGatewayURL}/desktop/frontend/template/ionic`, data).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}