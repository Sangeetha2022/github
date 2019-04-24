import { Request, response } from 'express';
import { FeatureFlowDao } from '../daos/featureflow.dao';
import * as asynLoop from 'node-async-loop';

let featureFlowDao = new FeatureFlowDao()

export class FeatureFlowService {

    public saveFeatureFlow(req: Request, callback: CallableFunction) {
        if (req.body instanceof Array) {
            const responseArray = [];
            asynLoop(req.body, (element, next) => {
                if (element) {
                    featureFlowDao.saveFeatureFlow(element, (feature) => {
                        responseArray.push(feature);
                        next();
                    })
                } else {
                    next();
                }
            }, (err) => {
                if (err) {

                } else {
                    callback({
                        status: '201',
                        message: 'array of feature flow object has been created',
                        data: responseArray
                    })
                }
            })
        } else {
            featureFlowDao.saveFeatureFlow(req.body, (feature) => {
                callback(feature)
            })
        }

    }

    public updateFeatureFlow(req: Request, callback: CallableFunction) {
        featureFlowDao.updateFeatureFlow(req, (feature) => {
            callback(feature)
        })
    }

    public getAllFeatureFlow(req: Request, callback: CallableFunction) {
        featureFlowDao.getAllFeatureFlow(req, (feature) => {
            callback(feature)
        })
    }

    public getFeatureFlowByID(req: Request, callback: CallableFunction) {
        featureFlowDao.getFeatureFlowByID(req, (feature) => {
            callback(feature)
        })
    }

    public getFeatureFlowByFeatureId(req: Request, callback: CallableFunction) {
        featureFlowDao.getFeatureFlowByFeatureId(req, (feature) => {
            callback(feature)
        })
    }



    public deleteFeatureFlow(req: Request, callback: CallableFunction) {
        featureFlowDao.deleteFeatureFlow(req, (feature) => {
            callback(feature)
        })
    }

}