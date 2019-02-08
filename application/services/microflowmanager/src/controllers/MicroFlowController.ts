import { Request, Response } from 'express';
import { MicroFlowService } from '../services/MicroFlowService';

let mFlowService = new MicroFlowService()

export class MicroFlowController {

    public saveMicroFlow(req: Request, res: Response) {
        mFlowService.saveMicroFlow(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

    public updateMicroFlow(req: Request, res: Response) {
        mFlowService.updateMicroFlow(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

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
        console.log("---<> > ", req.body)
        mFlowService.getMicroFlowByName(req, (user) => {
            res.status(200); // status for the response
            res.json(user); 
        })
    }

    public deleteMicroFlow(req: Request, res: Response) {
        mFlowService.deleteMicroFlow(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }
}