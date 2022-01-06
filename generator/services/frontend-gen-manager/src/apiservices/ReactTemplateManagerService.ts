import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class ReactTemplateManagerService {

    generateReactTemplate(details, callback) {
        new ApiAdaptar().post(`${SharedService.apiGatewayURL}/desktop/template/react`, details).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}