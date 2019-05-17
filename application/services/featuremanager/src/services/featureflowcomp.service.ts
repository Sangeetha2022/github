import { Request } from 'express';
import { FeatureFlowCompDao } from '../daos/featureflowcomp.dao';

let featureFlowCompDao = new FeatureFlowCompDao()

export class FeatureFlowCompService {

    public saveFeatureFlowComp(req: Request, callback: CallableFunction) {
        console.log('+++++++++++++++++', req.body)
        featureFlowCompDao.saveFeatureFlowComp(req, (feature) => {
            console.log('+++++++++++++++++', feature)
            callback(feature)
        })
    }

    public updateFeatureFlowComp(req: Request, callback: CallableFunction) {
        featureFlowCompDao.updateFeatureFlowComp(req, (feature) => {
            callback(feature)
        })
    }

    public getAllFeatureFlowComp(req: Request, callback: CallableFunction) {
        featureFlowCompDao.getAllFeatureFlowComp(req, (feature) => {
            callback(feature)
        })
    }

    public getFeatureFlowCompByID(req: Request, callback: CallableFunction) {
        featureFlowCompDao.getFeatureFlowCompByID(req, (feature) => {
            callback(feature)
        })
    }

    public getFeatureFlowCompByFlowID(req: Request, callback: CallableFunction) {
        featureFlowCompDao.getFeatureFlowCompByFlowID(req, (feature) => {
            callback(feature)
        })
    }

    public deleteFeatureFlowComp(req: Request, callback: CallableFunction) {
        featureFlowCompDao.deleteFeatureFlowComp(req, (feature) => {
            callback(feature)
        })
    }

}