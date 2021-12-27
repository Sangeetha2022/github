import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class EntityManagerService {

    public deleteProjectEntity(req, projectid, callback) {
        const projectId = projectid;
        new ApiAdapter().delete(`${SharedService.apiGatewayURL}/desktop/entity/deletebyproject/${projectId}?log_id=${req.query.log_id}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

    public getProjectEntity(req, projectid, callback) {
        const projectId = projectid;
        new ApiAdapter().get(`${SharedService.apiGatewayURL}/desktop/entity/getbyproject/${projectId}?log_id=${req.query.log_id}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

    public getByEntityId(req, entityid, callback) {
        const EntityId = entityid;
        new ApiAdapter().get(`${SharedService.apiGatewayURL}/desktop/entity/get/${EntityId}?log_id=${req.query.log_id}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

    public deleteEntityById(req, entityid, callback) {
        const entityId = entityid;
        new ApiAdapter().delete(`${SharedService.apiGatewayURL}/desktop/entity/delete/${entityId}?log_id=${req.query.log_id}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

}