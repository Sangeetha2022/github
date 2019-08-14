import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/Sharedservice';
const logger = require('../config/Logger');

export class Loginmanagerservice {

    getallUser(callback) {
        logger.info('Enter into getallUser');
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/getallusers`).then(
            data => {
                callback(data);
        logger.info('Exit from getallUser');

            }
        ).catch(error => {
            callback(error);
        })
    }

    getuserbyid(id,callback) {
        logger.info('Enter into getuserbyid');
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/getuser/${id}`).then(
            data => {
                callback(data);
        logger.info('Exit from getuserbyid');

            }
        ).catch(error => {
            callback(error);
        })

    }

    getallroles(callback) {
        logger.info('Enter into getallroles');
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/getallroles`).then(
            data => {
                callback(data);
        logger.info('Exit from getallroles');

            }
        ).catch(error => {
            callback(error);
        })
    }

    Updateuser(body,callback) {
        logger.info('Enter into Updateuser');
        new ApiAdaptar().put(`${SharedService.apiGatewayURL}/desktop/updateuser`,body).then(
            data => {
                callback(data);
        logger.info('Exit from Updateuser');

            }
        ).catch(error => {
            callback(error);
        })
    }
}