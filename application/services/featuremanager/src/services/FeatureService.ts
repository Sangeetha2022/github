import { Request } from 'express';
import { EntityManagerService } from '../apiservices/EntityManagerService';
import { FeatureDao } from '../daos/FeatureDao';


const featureDao = new FeatureDao();
const enetityManagerService = new EntityManagerService();
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

    public deleteProjectFeature(req: Request, callback: CallableFunction) {
        const projectId = req.params.id;
        featureDao.deleteProjectFeature(projectId, (feature) => {
            callback(feature)
        })
    }

    public updateFeatureEntity(req: Request, callback: CallableFunction) {
        const featureId = req.query.featureId;
        const details = req.body;
        featureDao.updateFeatureEntity(featureId, details, (feature) => {
            callback(feature);
        })
    }

    public featureUpdateEntity(req: Request, callback: CallableFunction) {
        let entity = req.body
        let featureId = req.params.featureId
        console.log("id------->", featureId);
        featureDao.featureUpdateEntity(entity, featureId, (response) => {
            callback(response)
        })
    }

    public getFeatureIDByEntity(req: Request, callback: CallableFunction) {
        const featureId = req.params.id;
        featureDao.getFeatureById(featureId, (response) => {
            const enetityID = response.entities.map(({ entityId }) => entityId)
           enetityManagerService.getAllFeatureEntites(enetityID ,(entityResposne) => {
               callback(entityResposne)
           })
        })
    }

    public featuredeleteentity(req: Request, callback: CallableFunction) {
        let entityId = req.params.entityid;
        let featureId = req.params.featureId;

        featureDao.featuredeleteentity(entityId, featureId, (response) => {
            callback(response);
        })
    }
}