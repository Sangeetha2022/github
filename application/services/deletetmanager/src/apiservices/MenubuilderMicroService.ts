import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class MenuBuilderManagerService {

    public deleteProjectMenu(req, projectid, callback) {
        const projectId = projectid;
        new ApiAdapter().delete(`${SharedService.apiGatewayURL}/desktop/menu/deletebyproject/${projectId}?log_id=${req.query.log_id}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

    public deleteMenuById(req, menuid, callback) {
        const menuId = menuid;
        new ApiAdapter().delete(`${SharedService.apiGatewayURL}/desktop/menu/delete/${menuId}?log_id=${req.query.log_id}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }
}