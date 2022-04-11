import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class ProjectManagerService 
{
    public deleteProjectById(req, projectid, callback) 
    {
        const projectId = projectid;
        new ApiAdapter().delete(`${SharedService.apiGatewayURL}/desktop/projects/delete/${projectId}?log_id=${req.query.log_id}`).then
            (data => 
            {
                callback(data);
            }).catch(error => 
               {
                callback(error);
               })
    }
}