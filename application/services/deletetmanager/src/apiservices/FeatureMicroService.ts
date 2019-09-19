import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class FeatureManagerService {

    public deleteProjectFeature(projectid, callback) {
        const projectId = projectid;
        new ApiAdaptar().delete(`${SharedService.apiGatewayURL}/desktop/feature/deletebyproject/${projectId}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

    public getFeatureByProjectId(projectid, callback) {
        const projectId = projectid;
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/feature/project/get/?projectId=${projectId}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }

    public getFeatureById(featureid, callback) {
        const featureId = featureid;
        new ApiAdaptar().get(`${SharedService.apiGatewayURL}/desktop/feature/get/?featureId=${featureId}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }


    public deleteFeatureById(featureid, callback) {
        const featureId = featureid;
        new ApiAdaptar().delete(`${SharedService.apiGatewayURL}/desktop/feature/delete/${featureId}`).then
            (data => {
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }
}