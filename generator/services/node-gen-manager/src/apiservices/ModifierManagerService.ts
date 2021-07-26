import { ApiAdaptar } from '../config/ApiAdaptar';
import * as Constants from '../config/Constants';

export class ModifierManagerService {

    getModifiersByProjectDetails(projectDetials, callback) {
        new ApiAdaptar().get(`${Constants.APIGATEWAYURL}/desktop/modifier/usage/get/projectdetials?project_id=${projectDetials.project_id}&feature_id=${projectDetials.feature_id}&modify_target_type_id=${projectDetials.modify_target_type_id}`).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}
