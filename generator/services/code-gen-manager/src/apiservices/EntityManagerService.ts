import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class EntityManagerService {

    getEntityById(entityId, callback) {
        console.log('getflow by name ----- ', entityId);
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/entity/get/${entityId}`).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}