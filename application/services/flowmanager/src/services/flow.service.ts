import { Request, NextFunction } from 'express';
import { FlowDao } from '../daos/flow.dao';

let flowDao = new FlowDao()

export class FlowService {

    public saveFlow(req: Request, callback: CallableFunction) {
        const flow = req.body;
        flowDao.saveFlow(flow, (response) => {
            callback(response);
        })
    }

    public getAllFlow(req: Request, callback: CallableFunction) {
        flowDao.getAllFlow(req, (flow) => {
            callback(flow);
        })
    }

    public getFlowByID(req: Request, next: NextFunction, callback: CallableFunction) {
        flowDao.getFlowByID(req, next, (flow) => {
            callback(flow);
        })
    }

    public deleteFlow(req: Request, next: NextFunction, callback: CallableFunction) {
        const flowID = req.params.id;
        flowDao.deleteFlow(flowID, next, (response) => {
            callback(response);
        })
    }

    public updateFlow(req: Request, next: NextFunction, callback: CallableFunction) {
        flowDao.updateFlow(req, next, (response) => {
            callback(response);
        })
    }

}