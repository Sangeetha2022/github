import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class GepFileManagerService {


    getFileDataByIds(fileIDs, callback) {
        new ApiAdaptar().post(`${SharedService.apiGatewayURL}/desktop/getattachment`, fileIDs).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

}