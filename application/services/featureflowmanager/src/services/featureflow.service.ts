import { Request, NextFunction } from 'express';
import { FlowDao } from '../daos/featureflow.dao';

let flowDao = new FlowDao()

export class FlowService {

    public saveFeatureFlow(req: Request, callback: CallableFunction) {
        const flow = req.body;
        flowDao.saveFeatureFlow(flow, (response) => {
            callback(response);
        })
    }

    public getAllFeatureFlow(req: Request, callback: CallableFunction) {
        flowDao.getAllFeatureFlow(req, (flow) => {
            callback(flow);
        })
    }

    // public getFeatureFlowByName(req: Request,next: NextFunction, callback: CallableFunction) {
    //     flowDao.getFeatureFlowByName(req, next, (flow) => {
    //         callback(flow);
    //     })
    // }

    

    public getFeatureFlowByID(req: Request, next: NextFunction, callback: CallableFunction) {
        flowDao.getFeatureFlowByID(req, next, (flow) => {
            callback(flow);
        })
    }

    public deleteFeatureFlow(req: Request, next: NextFunction, callback: CallableFunction) {
        const flowID = req.params.id;
        flowDao.deleteFeatureFlow(flowID, next, (response) => {
            callback(response);
        })
    }

    updateFeatureFlow = (req: Request, next: NextFunction, callback: CallableFunction) => {
        flowDao.updateFeatureFlow(req, next, (response) => {
            callback(response);
        })
    }

    getFeatureFlowDetails = (req: Request, next: NextFunction, callback: CallableFunction) => {
        flowDao.getFeatureFlowDetails(req, next, (response) => {
            callback(response);
        })
    }

    updateFeatureFlowComponent = (req: Request, next: NextFunction, callback: CallableFunction) => {
        flowDao.updateFeatureFlowComponent(req, next, (response) => {
            callback(response);
        })
    }

    addFeatureFlowComponent = (req: Request, next: NextFunction, callback: CallableFunction) => {
        flowDao.addFeatureFlowComponent(req, next, (response) => {
            callback(response);
        })
    }

}