import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class MenuBuilderManagerService {

    public deleteProjectMenu(projectid, callback) {
        const projectId = projectid;
        new ApiAdaptar().delete(`${SharedService.apiGatewayURL}/desktop/menu/deletebyproject/${projectId}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

    public deleteMenuById(menuid, callback) {
        const menuId = menuid;
        new ApiAdaptar().delete(`${SharedService.apiGatewayURL}/desktop/menu/delete/${menuId}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }
}