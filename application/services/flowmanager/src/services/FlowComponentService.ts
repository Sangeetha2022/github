import { Request } from 'express';
import { FlowComponentDao } from '../daos/FlowComponentDao';

let flowComponentDao = new FlowComponentDao()

export class FlowComponentService {

    public saveFlowComonents(req: Request, callback: CallableFunction) {
        flowComponentDao.saveFlowComonents(req, (generationFlow) => {
            callback(generationFlow)
        })
    }

    public updateFlowComponent(req: Request, callback: CallableFunction) {
        flowComponentDao.updateFlowComponent(req, (generationFlow) => {
            callback(generationFlow)
        })
    }

    public getAllFlowComponents(req: Request, callback: CallableFunction) {
        flowComponentDao.getAllFlowComponents(req, (flowComponent) => {
            callback(flowComponent)
        })
    }

    public getFlowComponentsByID(req: Request, callback: CallableFunction) {
        flowComponentDao.getFlowComponentsByID(req, (flowComponent) => {
            callback(flowComponent)
        })
    }

    public getFlowComponentsByName(req: Request, callback: CallableFunction) {
        flowComponentDao.getFlowComponentsByName(req, (flowComponent) => {
            callback(flowComponent)
        })
    }

}