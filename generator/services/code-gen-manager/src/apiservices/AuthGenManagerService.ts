import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class AuthGenService {

    authPath(projectId, projectDetails,auth_templatepath, callback) {
        const authPath = `${projectDetails.authTemplatePath}`;
        const generatePath = `${projectDetails.projectGenerationPath}/${projectDetails.name}`
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/auth/?projectID=${projectId}&authPath=${authPath}&projectPath=${generatePath}&authTemplate=${auth_templatepath}`).then(
            data => {
                console.log('-------data-----from api gateway----', data);
                callback(data)
            }).catch(error => {
                callback(error)

            });


    }

}
