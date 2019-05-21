import { Request, Response } from 'express';
import { MicroFlowService } from '../services/microflow.service';

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

    public getAllMicroFlow(req: Request, res: Response) {
        mFlowService.getAllMicroFlow(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

    public getMicroFlowByID(req: Request, res: Response) {
        mFlowService.getMicroFlowByID(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

    public getMicroFlowByProjectId(req: Request, res: Response) {
        mFlowService.getMicroFlowByProjectId(req, (user) => {
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