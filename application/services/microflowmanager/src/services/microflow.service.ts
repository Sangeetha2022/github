import { Request } from 'express';
import { MicroFlowDao } from '../daos/microflow.dao';

let mFlowDao = new MicroFlowDao()

export class MicroFlowService{

    public saveMicroFlow (req: Request, callback:CallableFunction) {                
        mFlowDao.saveMicroFlow(req, (generationFlow) => {
            callback(generationFlow)
        })
    }

    public updateMicroFlow (req: Request, callback:CallableFunction) {           
        mFlowDao.updateMicroFlow(req, (generationFlow) => {
            callback(generationFlow)
        })
    }

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
    
    public deleteMicroFlow (req: Request, callback:CallableFunction) {           
        mFlowDao.deleteMicroFlow(req, (generationFlow) => {
            callback(generationFlow)
        })
    }

}