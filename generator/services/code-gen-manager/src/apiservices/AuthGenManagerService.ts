import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class AuthGenService {

    authPath(projectId, projectDetails , callback){
        const authPath =`${projectDetails.authTemplatePath}`;
        const generatePath = `${projectDetails.projectGenerationPath}/${projectDetails.name}`
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/auth/?projectID=${projectId}&authPath=${authPath}&projectPath=${generatePath}`).then
        (data =>{
            callback(data)
        }).catch(error => {
            callback(error)

        });   
        

    }

}
