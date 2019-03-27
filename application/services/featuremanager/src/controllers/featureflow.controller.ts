import { Request, Response } from 'express';
import { FeatureFlowService } from '../services/featureflow.service';

let featureFlowService = new FeatureFlowService()

export class FeatureFlowController {

    public saveFeatureFlow(req: Request, res: Response) {
        featureFlowService.saveFeatureFlow(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

    public updateFeatureFlow(req: Request, res: Response) {
        featureFlowService.updateFeatureFlow(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

    public getAllFeatureFlow(req: Request, res: Response) {
        featureFlowService.getAllFeatureFlow(req, (user) => {
            res.status(200); // status for the response
            res.json(user); 
        })
    }

    public getFeatureFlowByID(req: Request, res: Response) {
        featureFlowService.getFeatureFlowByID(req, (user) => {
            res.status(200); // status for the response
            res.json(user); 
        })
    }

    public getFeatureFlowByFeatureId(req: Request, res: Response) {
        featureFlowService.getFeatureFlowByFeatureId(req, (user) => {
            res.status(200); // status for the response
            res.json(user); 
        })
    }

    public deleteFeatureFlow(req: Request, res: Response) {
        featureFlowService.deleteFeatureFlow(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }
}