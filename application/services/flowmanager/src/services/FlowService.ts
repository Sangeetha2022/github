import { Request } from 'express';
import { FlowDao } from '../daos/FlowDao';

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

    public getFlowByID(req: Request, callback: CallableFunction) {
        flowDao.getFlowByID(req, (flow) => {
            callback(flow);
        })
    }

    public deleteFlow(req: Request, callback: CallableFunction) {
        console.log('delete flow in service --- ', req.params);
        const flowID = req.params.id;
        flowDao.deleteFlow(flowID, (response) => {
            callback(response);
        })
    }

    public updateFlow(req: Request, callback: CallableFunction) {
        const flowObject = req.body;
        flowDao.updateFlow(flowObject, (response) => {
            callback(response);
        })
    }

}