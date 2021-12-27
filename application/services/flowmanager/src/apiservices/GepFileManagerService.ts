import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class GepFileManagerService {


    getFileDataByIds(fileIDs, callback) {
        new ApiAdapter().post(`${SharedService.apiGatewayURL}/desktop/getattachment`, fileIDs).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

}