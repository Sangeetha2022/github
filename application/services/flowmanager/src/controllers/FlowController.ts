import { Request, Response } from 'express';
import { FlowService } from '../services/FlowService';

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
            res.status(200); // status for the response
            res.json(user);
        })
    }

    public getFlowByID(req: Request, res: Response) {
        flowService.getFlowByID(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

    public deleteFlow(req: Request, res: Response) {
        flowService.deleteFlow(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

}