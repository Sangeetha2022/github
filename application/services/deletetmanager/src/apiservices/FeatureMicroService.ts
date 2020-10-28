import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class FeatureManagerService {

    public deleteProjectFeature(req, projectid, callback) {
        const projectId = projectid;
        new ApiAdaptar().delete(`${SharedService.apiGatewayURL}/desktop/feature/deletebyproject/${projectId}?log_id=${req.query.log_id}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

    public getFeatureByProjectId(req, projectid, callback) {
        const projectId = projectid;
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/feature/project/get/?projectId=${projectId}&log_id=${req.query.log_id}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

    public getFeatureById(req, featureid, callback) {
        const featureId = featureid;
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/feature/get/?featureId=${featureId}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }


    public deleteFeatureById(req, featureid, callback) {
        const featureId = featureid;
        new ApiAdaptar().delete(`${SharedService.apiGatewayURL}/desktop/feature/delete/?featureId=${featureId}&log_id=${req.query.log_id}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }
}