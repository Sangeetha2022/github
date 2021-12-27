import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/Sharedservice';

export class Loginmanagerservice {

    getallUser(callback) {
        new ApiAdapter().get(`${SharedService.apiGatewayURL}/desktop/getallusers`).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    getuserbyid(id,callback) {
        new ApiAdapter().get(`${SharedService.apiGatewayURL}/desktop/getuser/${id}`).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })

    }

    getallroles(callback) {
        new ApiAdapter().get(`${SharedService.apiGatewayURL}/desktop/getallroles`).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    Updateuser(body,callback) {
        new ApiAdapter().put(`${SharedService.apiGatewayURL}/desktop/updateuser`,body).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}