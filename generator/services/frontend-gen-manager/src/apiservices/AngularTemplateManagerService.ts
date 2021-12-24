import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class AngularTemplateManagerService {

    generateAngularTemplate(details, callback) {
        new ApiAdapter().post(`${SharedService.apiGatewayURL}/desktop/template/angular`, details).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
    generateAngularTemplateV12(details, callback) {
        new ApiAdapter().post(`${SharedService.apiGatewayURL}/desktop/template/angularv12`, details).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
    generateAngularTemplateV13(details, callback) {
        new ApiAdapter().post(`${SharedService.apiGatewayURL}/desktop/template/angularv13`, details).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}