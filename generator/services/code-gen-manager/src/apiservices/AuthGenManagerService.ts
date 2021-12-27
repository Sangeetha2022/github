import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class AuthGenService {

    authPath(projectId, projectGenerationPath, authPath, auth_templatepath, projectName, callback) {
        console.log('auth path projectName are ------  ', projectName);
        new ApiAdapter().get(`${SharedService.apiGatewayURL}/desktop/auth/?projectID=${projectId}&projectPath=${projectGenerationPath}&authPath=${authPath}&authTemplate=${auth_templatepath}&projectName=${projectName}`).then(
            data => {
                console.log('-------data-----from api gateway----', data);
                callback(data)
            }).catch(error => {
                callback(error)

            });


    }

}
