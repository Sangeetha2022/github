import { Request, Response, NextFunction } from 'express';
import { FlowService } from '../services/flow.service';

let flowService = new FlowService()

export class FlowController {

    public saveFlow(req: Request, res: Response) {
        flowService.saveFlow(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public getAllFlow(req: Request, res: Response) {
        flowService.getAllFlow(req, (user) => {
            res.status(200);
            res.json(user);
        })
    }

    public getFlowByID(req: Request, res: Response, next: NextFunction) {
        flowService.getFlowByID(req, next, (user) => {
            res.status(200);
            res.json(user);
        })
    }

    public deleteFlow(req: Request, res: Response, next: NextFunction) {
        flowService.deleteFlow(req, next, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public updateFlow(req: Request, res: Response, next: NextFunction) {
        flowService.updateFlow(req, next, (response) => {
            res.status(200);
            res.json(response);
        })
    }

}