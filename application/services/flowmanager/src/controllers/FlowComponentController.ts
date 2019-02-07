import { Request, Response } from 'express';
import { FlowComponentService } from '../services/FlowComponentService';

let flowComponentService = new FlowComponentService()

export class FlowComponentController {

    public getAllFlowComponents(req: Request, res: Response) {
        flowComponentService.getAllFlowComponents(req, (flowComponent) => {
            res.status(200); // status for the response
            res.json(flowComponent); 
        })
    }

    public getFlowComponentsByID(req: Request, res: Response) {
        flowComponentService.getFlowComponentsByID(req, (flowComponent) => {
            res.status(200); // status for the response
            res.json(flowComponent); 
        })
    }

    public getFlowComponentsByName(req: Request, res: Response) {
        flowComponentService.getFlowComponentsByName(req, (flowComponent) => {
            res.status(200); // status for the response
            res.json(flowComponent); 
        })
    }
    
}