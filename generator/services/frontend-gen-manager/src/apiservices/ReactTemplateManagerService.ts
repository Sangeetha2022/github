import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class ReactTemplateManagerService {

    generateReactTemplate(details, callback) {
        new ApiAdapter().post(`${SharedService.apiGatewayURL}/desktop/template/react`, details).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    generateCustomReactTemplate(details, callback) {
        new ApiAdapter().post(`${SharedService.apiGatewayURL}/desktop/template/customtemplate/react`, details).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}