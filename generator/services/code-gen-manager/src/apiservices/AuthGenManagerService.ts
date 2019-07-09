import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class AuthGenService {

    authPath(projectId, projectGenerationPath, authPath, auth_templatepath, callback) {
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/auth/?projectID=${projectId}&projectPath=${projectGenerationPath}&authPath=${authPath}&authTemplate=${auth_templatepath}`).then(
            data => {
                console.log('-------data-----from api gateway----', data);
                callback(data)
            }).catch(error => {
                callback(error)

            });


    }

}
