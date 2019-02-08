import { Request } from 'express';
import { MicroFlowDao } from '../daos/MicroFlowDao';

let mFlowDao = new MicroFlowDao()

export class MicroFlowService{

    public getAllMicroFlow (req: Request, callback:CallableFunction) {           
        mFlowDao.getAllFlow(req, (flow) => {
            callback(flow)
        })
    }

    public getMicroFlowByID (req: Request, callback:CallableFunction) {           
        mFlowDao.getFlowByID(req, (flow) => {
            callback(flow)
        })
    }

    public getMicroFlowByName (req: Request, callback:CallableFunction) {           
        mFlowDao.getMicroFlowByName(req, (flow) => {
            callback(flow)
        })
    }
    
}