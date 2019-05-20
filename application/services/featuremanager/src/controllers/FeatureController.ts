import { Request, Response } from 'express';
import { FeatureService } from '../services/FeatureService';

let featureService = new FeatureService();

export class FeatureController {


    public saveFeature(req: Request, res: Response) {
        featureService.saveFeature(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

    public updateFeature(req: Request, res: Response) {
        featureService.updateFeature(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

    public getAllFeature(req: Request, res: Response) {
        featureService.getAllFeature(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

    public getFeatureById(req: Request, res: Response) {
        featureService.getFeatureById(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

    public getFeatureByProjectId(req: Request, res: Response) {
        featureService.getFeatureByProjectId(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

    public deleteFeature(req: Request, res: Response) {
        featureService.deleteFeature(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }
}