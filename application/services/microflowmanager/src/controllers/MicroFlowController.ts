import { Request, Response } from 'express';
import { MicroFlowService } from '../services/MicroFlowService';

let microFlowService = new MicroFlowService()

export class MicroFlowController {

    public saveMicroFlow(req: Request, res: Response) {
        microFlowService.saveMicroFlow(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public updateMicroFlow(req: Request, res: Response) {
        microFlowService.updateMicroFlow(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public getAllMicroFlow(req: Request, res: Response) {
        microFlowService.getAllMicroFlow(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public getMicroFlowByID(req: Request, res: Response) {
        microFlowService.getMicroFlowByID(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public getMicroFlow(req: Request, res: Response) {
        microFlowService.getMicroFlow(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

     public getBackendMicroFlow(req: Request, res: Response) {
        microFlowService.getBackendMicroFlow(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public getMicroFlowByProjectId(req: Request, res: Response) {
        microFlowService.getMicroFlowByProjectId(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public deleteMicroFlow(req: Request, res: Response) {
        microFlowService.deleteMicroFlow(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }
}