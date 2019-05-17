import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/Sharedservice';

export class Loginmanagerservice {

    getallUser(callback) {
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/getallusers`).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    getuserbyid(id,callback) {
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/getuser/${id}`).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })

    }

    getallroles(callback) {
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/getallroles`).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    Updateuser(body,callback) {
        new ApiAdaptar().put(`${SharedService.apiGatewayURL}/desktop/updateuser`,body).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}