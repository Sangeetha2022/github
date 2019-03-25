import { Request, Response } from 'express';
import { FeatureFlowEntityService } from '../services/featureflowentity.service';

let featureFlowEntityService = new FeatureFlowEntityService()

export class FeatureFlowEntityController {

    public saveFeatureFlowEntity(req: Request, res: Response) {
        featureFlowEntityService.saveFeatureFlowEntity(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

    public updateFeatureFlowEntity(req: Request, res: Response) {
        featureFlowEntityService.updateFeatureFlowEntity(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

    public getAllFeatureFlowEntity(req: Request, res: Response) {
        featureFlowEntityService.getAllFeatureFlowEntity(req, (user) => {
            res.status(200); // status for the response
            res.json(user); 
        })
    }

    public getFeatureFlowEntityByID(req: Request, res: Response) {
        featureFlowEntityService.getFeatureFlowEntityByID(req, (user) => {
            res.status(200); // status for the response
            res.json(user); 
        })
    }
    
    public getFeatureFlowEntityByFeatureID(req: Request, res: Response) {
        featureFlowEntityService.getFeatureFlowEntityByFeatureID(req, (user) => {
            res.status(200); // status for the response
            res.json(user); 
        })
    }
    

    public deleteFeatureFlowEntity(req: Request, res: Response) {
        featureFlowEntityService.deleteFeatureFlowEntity(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }
}