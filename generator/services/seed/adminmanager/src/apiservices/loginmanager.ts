import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/Sharedservice';
import { CustomLogger } from '../config/Logger'

export class Loginmanagerservice {

    getallUser(callback) {
        new CustomLogger().showLogger('info', 'Enter into loginmanager.ts: getallUser');
        new ApiAdapter().get(`${SharedService.apiGatewayURL}/desktop/getallusers`).then(
            data => {
                callback(data);
        new CustomLogger().showLogger('info', 'Exit from loginmanager.ts: getallUser');

            }
        ).catch(error => {
            callback(error);
        })
    }

    getuserbyid(id,callback) {
        new CustomLogger().showLogger('info', 'Enter into loginmanager.ts: getuserbyid');
        new ApiAdapter().get(`${SharedService.apiGatewayURL}/desktop/getuser/${id}`).then(
            data => {
                callback(data);
        new CustomLogger().showLogger('info', 'Exit from loginmanager.ts: getuserbyid');

            }
        ).catch(error => {
            callback(error);
        })

    }

    getallroles(callback) {
        new CustomLogger().showLogger('info', 'Enter into loginmanager.ts: getallroles');
        new ApiAdapter().get(`${SharedService.apiGatewayURL}/desktop/getallroles`).then(
            data => {
                callback(data);
        new CustomLogger().showLogger('info', 'Exit from loginmanager.ts: getallroles');

            }
        ).catch(error => {
            callback(error);
        })
    }

    Updateuser(body,callback) {
        new CustomLogger().showLogger('info', 'Enter into loginmanager.ts: Updateuser');
        new ApiAdapter().put(`${SharedService.apiGatewayURL}/desktop/updateuser`,body).then(
            data => {
                callback(data);
        new CustomLogger().showLogger('info', 'Exit from loginmanager.ts: Updateuser');

            }
        ).catch(error => {
            callback(error);
        })
    }
}