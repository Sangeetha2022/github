import { Request, Response } from 'express';
import { MicroFlowService } from '../services/MicroFlowService';

let mFlowService = new MicroFlowService()

export class MicroFlowController {

    public getAllFlow(req: Request, res: Response) {
        mFlowService.getAllMicroFlow(req, (user) => {
            res.status(200); // status for the response
            res.json(user); 
        })
    }

    public getFlowByID(req: Request, res: Response) {
        mFlowService.getMicroFlowByID(req, (user) => {
            res.status(200); // status for the response
            res.json(user); 
        })
    }

    public getMicroFlowByName(req: Request, res: Response) {
        mFlowService.getMicroFlowByName(req, (user) => {
            res.status(200); // status for the response
            res.json(user); 
        })
    }

}