import { Request } from 'express';
import { FeatureDao } from '../daos/FeatureDao';


let featureDao = new FeatureDao();
export class FeatureService {

    public saveFeature(req: Request, callback: CallableFunction) {
        const featureData = req.body;
        featureDao.saveFeatures(featureData, (feature) => {
            callback(feature)
        })
    }

    public updateFeature(req: Request, callback: CallableFunction) {
        const featureId = req.body._id;
        const featureData = req.body;
        featureDao.updateFeatures(featureId, featureData, (feature) => {
            callback(feature)
        })
    }

    public getAllFeature(req: Request, callback: CallableFunction) {
        featureDao.getAllFeature((feature) => {
            callback(feature)
        })
    }

    public getFeatureById(req: Request, callback: CallableFunction) {
        const featureId = req.query.featureId;
        featureDao.getFeatureById(featureId, (feature) => {
            callback(feature)
        })
    }

    public getFeatureByProjectId(req: Request, callback: CallableFunction) {
        const projectId = req.query.projectId;
        console.log('getfeature by project id are ------ ', projectId);
        featureDao.getFeatureByProjectId(projectId, (feature) => {
            callback(feature)
        })
    }

    public deleteFeature(req: Request, callback: CallableFunction) {
        const featureId = req.query.featureId;
        featureDao.deleteFeatures(featureId, (feature) => {
            callback(feature)
        })
    }

}