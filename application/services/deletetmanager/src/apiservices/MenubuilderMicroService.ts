import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class MenuBuilderManagerService {

    public deleteProjectMenu(req, projectid, callback) {
        const projectId = projectid;
        new ApiAdaptar().delete(`${SharedService.apiGatewayURL}/desktop/menu/deletebyproject/${projectId}?log_id=${req.query.log_id}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

    public deleteMenuById(req, menuid, callback) {
        const menuId = menuid;
        new ApiAdaptar().delete(`${SharedService.apiGatewayURL}/desktop/menu/delete/${menuId}?log_id=${req.query.log_id}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }
}