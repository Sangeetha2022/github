import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class EntityManagerService {

    public deleteProjectEntity(req, projectid, callback) {
        const projectId = projectid;
        new ApiAdaptar().delete(`${SharedService.apiGatewayURL}/desktop/entity/deletebyproject/${projectId}?log_id=${req.query.log_id}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

    public getProjectEntity(req, projectid, callback) {
        const projectId = projectid;
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/entity/getbyproject/${projectId}?log_id=${req.query.log_id}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

    public deleteEntityById(req, entityid, callback) {
        const entityId = entityid;
        new ApiAdaptar().delete(`${SharedService.apiGatewayURL}/desktop/entity/delete/${entityId}?log_id=${req.query.log_id}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

}