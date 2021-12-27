import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class TemplateMicroService {
    public deleteProjectTemplate(req, projectid, callback) {
        const projectId = projectid;
        new ApiAdapter().delete(`${SharedService.apiGatewayURL}/desktop/project/template/delete/${projectId}?log_id=${req.query.log_id}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }
}