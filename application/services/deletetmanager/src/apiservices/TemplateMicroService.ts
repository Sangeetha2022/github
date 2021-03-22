import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class TemplateMicroService {
    public deleteProjectTemplate(req, projectid, callback) {
        const projectId = projectid;
        new ApiAdaptar().delete(`${SharedService.apiGatewayURL}/desktop/project/template/delete/${projectId}?log_id=${req.query.log_id}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }
}