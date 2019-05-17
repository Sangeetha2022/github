import { Request, Response } from 'express';
import { FeatureService } from '../services/feature.service';
import { FeatureFlowCompService } from '../services/featureflowcomp.service';

let featureFlowCompService = new FeatureFlowCompService()

export class FeatureFlowCompController {

    public saveFeatureFlowComp(req: Request, res: Response) {
        featureFlowCompService.saveFeatureFlowComp(req, (user) => {
            console.log('+++++++++++++++++',res)
            res.status(200); // status for the response
            res.json(user);
        })
    }

    public updateFeatureFlowComp(req: Request, res: Response) {
        featureFlowCompService.updateFeatureFlowComp(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

    public getAllFeatureFlowComp(req: Request, res: Response) {
        featureFlowCompService.getAllFeatureFlowComp(req, (user) => {
            res.status(200); // status for the response
            res.json(user); 
        })
    }

    public getFeatureFlowCompByID(req: Request, res: Response) {
        featureFlowCompService.getFeatureFlowCompByID(req, (user) => {
            res.status(200); // status for the response
            res.json(user); 
        })
    }

    public getFeatureFlowCompByFlowID(req: Request, res: Response) {
        featureFlowCompService.getFeatureFlowCompByFlowID(req, (user) => {
            res.status(200); // status for the response
            res.json(user); 
        })
    }

    public deleteFeatureFlowComp(req: Request, res: Response) {
        featureFlowCompService.deleteFeatureFlowComp(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }
}