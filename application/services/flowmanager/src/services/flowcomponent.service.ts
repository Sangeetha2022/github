import { Request } from 'express';
import { FlowComponentDao } from '../daos/flowcomponent.dao';

let flowComponentDao = new FlowComponentDao()

export class FlowComponentService {

    public saveFlowComonents(req: Request, callback: CallableFunction) {
        flowComponentDao.saveFlowComonents(req, (generationFlow) => {
            callback(generationFlow)
        })
    }

    public updateFlowComponent(req: Request, next, callback: CallableFunction) {
        flowComponentDao.updateFlowComponent(req, next, (generationFlow) => {
            callback(generationFlow)
        })
    }

    public getAllFlowComponents(req: Request, next, callback: CallableFunction) {
        flowComponentDao.getAllFlowComponents(req, next, (flowComponent) => {
            callback(flowComponent)
        })
    }

    public getFlowComponentsByID(req: Request, next, callback: CallableFunction) {
        flowComponentDao.getFlowComponentsByID(req, next, (flowComponent) => {
            callback(flowComponent)
        })
    }

    public getFlowComponentsByName(req: Request, next, callback: CallableFunction) {
        flowComponentDao.getFlowComponentsByName(req, next, (flowComponent) => {
            callback(flowComponent)
        })
    }

}