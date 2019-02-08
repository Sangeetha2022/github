import { Request } from 'express';
import { GenerationFlowDao } from '../daos/GenerationFlowDao';

let generationFlowDao = new GenerationFlowDao()

export class GenerationFlowService{

    public addGenerationFlow (req: Request, callback:CallableFunction) {                
        generationFlowDao.addGenerationFlow(req, (generationFlow) => {
            callback(generationFlow)
        })
    }

    public getAllGenerationFlow (req: Request, callback:CallableFunction) {           
        generationFlowDao.getAllGenerationFlow(req, (generationFlow) => {
            callback(generationFlow)
        })
    }

    public getGenerationFlowByID (req: Request, callback:CallableFunction) {           
        generationFlowDao.getGenerationFlowByID(req, (generationFlow) => {
            callback(generationFlow)
        })
    }

    public getGenerationFlowByName (req: Request, callback:CallableFunction) {           
        generationFlowDao.getGenerationFlowByName(req, (generationFlow) => {
            callback(generationFlow)
        })
    }

    public updateGenerationFlow (req: Request, callback:CallableFunction) {           
        generationFlowDao.updateGenerationFlow(req, (generationFlow) => {
            callback(generationFlow)
        })
    }

    public deleteGenerationFlow (req: Request, callback:CallableFunction) {           
        generationFlowDao.deleteGenerationFlow(req, (generationFlow) => {
            callback(generationFlow)
        })
    }
    
}