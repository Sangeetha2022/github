import { Request, Response } from 'express';
import { FeatureService } from '../services/FeatureService';



export class FeatureController {

    private featureService = new FeatureService();

    public saveFeature(req: Request, res: Response) {
        this.featureService.saveFeature(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

    public updateFeature(req: Request, res: Response) {
        this.featureService.updateFeature(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

    public getAllFeature(req: Request, res: Response) {
        this.featureService.getAllFeature(req, (user) => {
            res.status(200); // status for the response
            res.json(user); 
        })
    }

    public getFeatureById(req: Request, res: Response) {
        this.featureService.getFeatureById(req, (user) => {
            res.status(200); // status for the response
            res.json(user); 
        })
    }

    public getFeatureByProjectId(req: Request, res: Response) {
        this.featureService.getFeatureByProjectId(req, (user) => {
            res.status(200); // status for the response
            res.json(user); 
        })
    }

    public deleteFeature(req: Request, res: Response) {
        this.featureService.deleteFeature(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }
}