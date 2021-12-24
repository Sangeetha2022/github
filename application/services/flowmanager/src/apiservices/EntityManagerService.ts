import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class EntityManagerService {


    createEntity(req, payload, callback) {
        new ApiAdapter().post(`${SharedService.apiGatewayURL}/desktop/entity/save` + `?log_id=${req.query.log_id}`, payload).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    updateEntity(req, payload, callback) {
        new ApiAdapter().put(`${SharedService.apiGatewayURL}/desktop/entity/update` + `?log_id=${req.query.log_id}`, payload).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

    getEntity(req, callback) {
        new ApiAdapter().get(`${SharedService.apiGatewayURL}/desktop/entity/feature/get` + `?log_id=${req.query.log_id}&featureId=${req.body.feature_id}`).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }

}