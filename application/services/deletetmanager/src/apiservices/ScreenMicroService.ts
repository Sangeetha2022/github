import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class ScreenManagerService {

    public deleteProjectScreen(req, projectid, callback) {
        const projectId = projectid;
        new ApiAdaptar().delete(`${SharedService.apiGatewayURL}/desktop/screen/deletebyproject/${projectId}?log_id=${req.query.log_id}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

    public deletetScreenById(req, screenid, callback) {
        const screenId = screenid;
        new ApiAdaptar().delete(`${SharedService.apiGatewayURL}/desktop/screen/delete/${screenId}?log_id=${req.query.log_id}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

    public getScreenByFeatureId(req, featureid, callback) {
        const featureId = featureid;
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/screen/getbyfeatureid/${featureId}?log_id=${req.query.log_id}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

    public getScreenById(req, screenid, callback) {
        const screenId = screenid;
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/screen/get/${screenId}?log_id=${req.query.log_id}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }
}
