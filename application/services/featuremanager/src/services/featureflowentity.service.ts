import { Request } from 'express';
import { FeatureDao } from '../daos/feature.dao';
import { FeatureFlowEntityDao } from '../daos/featurflowentity.dao';

let featureFlowEntityDao = new FeatureFlowEntityDao()

export class FeatureFlowEntityService{

    public saveFeatureFlowEntity (req: Request, callback:CallableFunction) {                
        featureFlowEntityDao.saveFeatureFlowEntity(req, (feature) => {
            callback(feature)
        })
    }

    public updateFeatureFlowEntity (req: Request, callback:CallableFunction) {           
        featureFlowEntityDao.updateFeatureFlowEntity(req, (feature) => {
            callback(feature)
        })
    }

    public getAllFeatureFlowEntity (req: Request, callback:CallableFunction) {           
        featureFlowEntityDao.getAllFeatureFlowEntity(req, (feature) => {
            callback(feature)
        })
    }

    public getFeatureFlowEntityByID (req: Request, callback:CallableFunction) {           
        featureFlowEntityDao.getFeatureFlowEntityByID(req, (feature) => {
            callback(feature)
        })
    }
    
    public deleteFeatureFlowEntity (req: Request, callback:CallableFunction) {           
        featureFlowEntityDao.deleteFeatureFlowEntity(req, (feature) => {
            callback(feature)
        })
    }

}