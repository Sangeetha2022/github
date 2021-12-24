import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class EntityManagerService {

    getEntityById(entityId, callback) {
        console.log('getEntity by id ----- ', entityId);
        new ApiAdapter().get(`${SharedService.apiGatewayURL}/desktop/entity/get/${entityId}`).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}