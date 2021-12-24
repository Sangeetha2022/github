import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class FeatureManagerService {

    public deleteProjectFeature(req, projectid, callback) {
        const projectId = projectid;
        new ApiAdapter().delete(`${SharedService.apiGatewayURL}/desktop/feature/deletebyproject/${projectId}?log_id=${req.query.log_id}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

    public getFeatureByProjectId(req, projectid, callback) {
        const projectId = projectid;
        new ApiAdapter().get(`${SharedService.apiGatewayURL}/desktop/feature/project/get/?projectId=${projectId}&log_id=${req.query.log_id}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

    public getFeatureById(req, featureid, callback) {
        const featureId = featureid;
        new ApiAdapter().get(`${SharedService.apiGatewayURL}/desktop/feature/get/?featureId=${featureId}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }


    public deleteFeatureById(req, featureid, callback) {
        const featureId = featureid;
        new ApiAdapter().delete(`${SharedService.apiGatewayURL}/desktop/feature/delete/?featureId=${featureId}&log_id=${req.query.log_id}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

    public deleteFeatureEntity(req, featureid, entityid, callback) {
        const featureId = featureid;
        const entityId = entityid;
        new ApiAdapter().delete(`${SharedService.apiGatewayURL}/desktop/feature/deleteentity/${featureId}/${entityId}?log_id=${req.query.log_id}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }
}