import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class EntityManagerService {

    public deleteProjectEntity(projectid, callback) {
        const projectId = projectid;
        new ApiAdaptar().delete(`${SharedService.apiGatewayURL}/desktop/entity/deletebyproject/${projectId}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

    public getProjectEntity(projectid, callback) {
        const projectId = projectid;
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/entity/getbyproject/${projectId}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

    public deleteEntityById(entityid, callback) {
        const entityId = entityid;
        new ApiAdaptar().delete(`${SharedService.apiGatewayURL}/desktop/entity/delete/${entityId}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

}