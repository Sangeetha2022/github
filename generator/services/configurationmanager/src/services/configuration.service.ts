import { Request } from 'express';
import { GenerationFlowDao } from '../daos/configuration.dao';

let generationFlowDao = new GenerationFlowDao()

export class GenerationFlowService {

    public addGenerationFlow(req: Request, callback: CallableFunction) {
        generationFlowDao.addGenerationFlow(req, (generationFlow) => {
            callback(generationFlow)
        })
    }

    public getAllGenerationFlow(req: Request, callback: CallableFunction) {
        generationFlowDao.getAllGenerationFlow(req, (generationFlow) => {
            callback(generationFlow)
        })
    }

    public getGenerationFlowByID(req: Request, next, callback: CallableFunction) {
        generationFlowDao.getGenerationFlowByID(req, next, (generationFlow) => {
            callback(generationFlow)
        })
    }

    public getGenerationFlowByName(req: Request, next, callback: CallableFunction) {
        generationFlowDao.getGenerationFlowByName(req, next, (generationFlow) => {
            callback(generationFlow)
        })
    }

    public updateGenerationFlow(req: Request, next, callback: CallableFunction) {
        generationFlowDao.updateGenerationFlow(req, next, (generationFlow) => {
            callback(generationFlow)
        })
    }

    public deleteGenerationFlow(req: Request, next, callback: CallableFunction) {
        generationFlowDao.deleteGenerationFlow(req, next, (generationFlow) => {
            callback(generationFlow)
        })
    }

    public getTechPropertyFlow(req: Request, next, callback: CallableFunction) {
        generationFlowDao.getTechPropertyFlow(req, next, (generationFlow) => {
            callback(generationFlow)
        })
    }

}