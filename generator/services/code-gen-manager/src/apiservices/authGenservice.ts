import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class AuthGenService {

    authPath(projectId, projectDetails , callback){
        console.log('i am project ahhha ahhhaa---->>',projectDetails)
        const authPath =`${projectDetails.authTemplatePath}`;
        const generatePath = `${projectDetails.projectGenerationPath}`
        console.log("*******auth genn--->>>", authPath)
        new ApiAdaptar().get(`${SharedService.authGen}/auth/?projectID=${projectId}&authPath=${authPath}&projectPath=${generatePath}`).then
        (data =>{
            console.log('auth datda===>>>', data)
            callback(data)


        }).catch(error => {
            callback(error)

        });
        

    }

}