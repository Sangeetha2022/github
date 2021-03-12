import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';



export class TemplateManagerService {

    getTemplateByName(templateName, callback) {
        console.log('template name for this project is ----  ', templateName);
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/template/gettemplatename?template_name=${templateName}`).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    getTemplateByProject(projectId, callback) {
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/template/project/${projectId}`).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}