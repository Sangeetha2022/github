import { Request } from 'express';
import { FeatureFlowDao } from '../daos/featureflow.dao';

let featureFlowDao = new FeatureFlowDao()

export class FeatureFlowService{

    public saveFeatureFlow (req: Request, callback:CallableFunction) {                
        featureFlowDao.saveFeatureFlow(req, (feature) => {
            callback(feature)
        })
    }

    public updateFeatureFlow (req: Request, callback:CallableFunction) {           
        featureFlowDao.updateFeatureFlow(req, (feature) => {
            callback(feature)
        })
    }

    public getAllFeatureFlow (req: Request, callback:CallableFunction) {           
        featureFlowDao.getAllFeatureFlow(req, (feature) => {
            callback(feature)
        })
    }

    public getFeatureFlowByID (req: Request, callback:CallableFunction) {           
        featureFlowDao.getFeatureFlowByID(req, (feature) => {
            callback(feature)
        })
    }
    
    public deleteFeatureFlow (req: Request, callback:CallableFunction) {           
        featureFlowDao.deleteFeatureFlow(req, (feature) => {
            callback(feature)
        })
    }

}