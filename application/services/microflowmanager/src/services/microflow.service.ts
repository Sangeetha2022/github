import { Request } from 'express';
import { MicroFlowDao } from '../daos/microflow.dao';

let mFlowDao = new MicroFlowDao()

export class MicroFlowService{

    public saveMicroFlow(req: Request, callback: CallableFunction) {
        const microflowData = req.body;
        mFlowDao.saveMicroFlow(microflowData, (feature) => {
            callback(feature)
        })
    }

    public updateMicroFlow(req: Request, callback: CallableFunction) {
        const microflowId = req.body._id;
        const microflowData = req.body;
        mFlowDao.updateMicroFlow(microflowId, microflowData, (microflow) => {
            callback(microflow)
        })
    }

    public getAllMicroFlow(req: Request, callback: CallableFunction) {
        mFlowDao.getAllMicroFlow((microflow) => {
            callback(microflow)
        })
    }

    public getMicroFlowByID(req: Request, callback: CallableFunction) {
        const microflowId = req.query.microflowId;
        mFlowDao.getMicroFlowByID(microflowId, (microflow) => {
            callback(microflow)
        })
    }

    public getMicroFlowByProjectId(req: Request, callback: CallableFunction) {
        const projectId = req.query.projectId;
        console.log('get microflow by project id are ------ ', projectId);
        mFlowDao.getMicroFlowByProjectId(projectId, (microflow) => {
            callback(microflow)
        })
    }

    public deleteMicroFlow(req: Request, callback: CallableFunction) {
        const microflowId = req.query.microflowId;
        mFlowDao.deleteMicroFlow(microflowId, (microflow) => {
            callback(microflow)
        })
    }

}