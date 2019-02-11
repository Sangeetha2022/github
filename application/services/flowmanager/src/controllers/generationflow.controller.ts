import { Request, Response, NextFunction } from 'express';
import { GenerationFlowService } from '../services/generationflow.service';

let generationFlowService = new GenerationFlowService()

export class GenerationFlowController {

    public addGenerationFlow(req: Request, res: Response) {

        generationFlowService.addGenerationFlow(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

    public getAllGenerationFlow(req: Request, res: Response) {
        generationFlowService.getAllGenerationFlow(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

    public getGenerationFlowByID(req: Request, res: Response, next: NextFunction) {
        generationFlowService.getGenerationFlowByID(req, next, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

    public getGenerationFlowByName(req: Request, res: Response, next: NextFunction) {
        generationFlowService.getGenerationFlowByName(req, next, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }


    public updateGenerationFlow(req: Request, res: Response, next: NextFunction) {
        generationFlowService.updateGenerationFlow(req, next, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

    public deleteGenerationFlow(req: Request, res: Response, next: NextFunction) {
        generationFlowService.deleteGenerationFlow(req, next, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

}