import { Request } from 'express';
import { FeatureDao } from '../daos/feature.dao';

let featureDao = new FeatureDao()

export class FeatureService{

    public saveFeature (req: Request, callback:CallableFunction) {                
        featureDao.saveFeature(req, (feature) => {
            callback(feature)
        })
    }

    public updateFeature (req: Request, callback:CallableFunction) {           
        featureDao.updateFeature(req, (feature) => {
            callback(feature)
        })
    }

    public getAllFeature (req: Request, callback:CallableFunction) {           
        featureDao.getAllFeature(req, (feature) => {
            callback(feature)
        })
    }

    public getFeatureByID (req: Request, callback:CallableFunction) {           
        featureDao.getFeatureByID(req, (feature) => {
            callback(feature)
        })
    }

    public getFeatureByName (req: Request, callback:CallableFunction) {           
        featureDao.getFeatureByName(req, (feature) => {
            callback(feature)
        })
    }
    
    public deleteFeature (req: Request, callback:CallableFunction) {           
        featureDao.deleteFeature(req, (feature) => {
            callback(feature)
        })
    }

}