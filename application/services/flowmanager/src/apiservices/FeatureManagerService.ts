import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class FeatureManagerService {


    featureUpdateEntity(req, entityDetails, callback) {
        new ApiAdaptar().put(`${SharedService.apiGatewayURL}/desktop/feature/updateEntity/${req.body.feature_id}` + `?log_id=${req.query.log_id}`, entityDetails).then(
            data => {
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }


}