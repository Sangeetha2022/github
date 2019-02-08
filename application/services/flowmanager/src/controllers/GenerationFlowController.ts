import { Request, Response } from 'express';
import { GenerationFlowService } from '../services/GenerationFlowService';

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

    public getGenerationFlowByID(req: Request, res: Response) {
        generationFlowService.getGenerationFlowByID(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

    public getGenerationFlowByName(req: Request, res: Response) {
        generationFlowService.getGenerationFlowByName(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }


    public updateGenerationFlow(req: Request, res: Response) {
        generationFlowService.updateGenerationFlow(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

    public deleteGenerationFlow(req: Request, res: Response) {
        generationFlowService.deleteGenerationFlow(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

}