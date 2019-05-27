import { Request } from 'express';
import { MicroFlowDao } from '../daos/MicroFlowDao';

let microFlowDao = new MicroFlowDao()

export class MicroFlowService{

    public saveMicroFlow(req: Request, callback: CallableFunction) {
        const microflowData = req.body;
        microFlowDao.saveMicroFlow(microflowData, (feature) => {
            callback(feature)
        })
    }

    public updateMicroFlow(req: Request, callback: CallableFunction) {
        const microflowId = req.body._id;
        const microflowData = req.body;
        microFlowDao.updateMicroFlow(microflowId, microflowData, (microflow) => {
            callback(microflow)
        })
    }

    public getAllMicroFlow(req: Request, callback: CallableFunction) {
        microFlowDao.getAllMicroFlow((microflow) => {
            callback(microflow)
        })
    }

    public getMicroFlowByID(req: Request, callback: CallableFunction) {
        const microflowId = req.query.microflowId;
        microFlowDao.getMicroFlowByID(microflowId, (microflow) => {
            callback(microflow)
        })
    }

    public getMicroFlow(req: Request, callback: CallableFunction) {
        const microFlowIDS = req.body;
        microFlowDao.getMicroFlow(microFlowIDS ,(microflow) => {
            callback(microflow);
        })
    }

    public getBackendMicroFlow(req: Request, callback: CallableFunction) {
        const microFlowIDS = req.body;
        microFlowDao.getBackendMicroFlow(microFlowIDS ,(microflow) => {
            callback(microflow);
        })
    }

    public getMicroFlowByProjectId(req: Request, callback: CallableFunction) {
        const projectId = req.query.projectId;
        microFlowDao.getMicroFlowByProjectId(projectId, (microflow) => {
            callback(microflow)
        })
    }

    public deleteMicroFlow(req: Request, callback: CallableFunction) {
        const microflowId = req.query.microflowId;
        microFlowDao.deleteMicroFlow(microflowId, (microflow) => {
            callback(microflow)
        })
    }

}