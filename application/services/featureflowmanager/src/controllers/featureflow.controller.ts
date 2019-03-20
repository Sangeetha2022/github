import { Request, Response, NextFunction } from 'express';
import { FlowService } from '../services/featureflow.service';

let flowService = new FlowService()

export class FlowController {

    public saveFeatureFlow(req: Request, res: Response, next: NextFunction) {
        flowService.saveFeatureFlow(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public getAllFeatureFlow(req: Request, res: Response, next: NextFunction) {
        flowService.getAllFeatureFlow(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    // public getFeatureFlowByName(req: Request, res: Response, next: NextFunction) {
    //     flowService.getFeatureFlowByName(req,next, (response) => {
    //         res.status(200);
    //         res.json(response);
    //     })
    // }

    public getFeatureFlowByID(req: Request, res: Response, next: NextFunction) {
        flowService.getFeatureFlowByID(req, next, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public deleteFeatureFlow(req: Request, res: Response, next: NextFunction) {
        flowService.deleteFeatureFlow(req, next, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public updateFeatureFlow(req: Request, res: Response, next: NextFunction) {
        flowService.updateFeatureFlow(req, next, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    getFeatureFlowDetails = (req: Request, res: Response, next: NextFunction) => {
        flowService.getFeatureFlowDetails(req, next, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    updateFeatureFlowComponent = (req: Request, res: Response, next: NextFunction) => {
        flowService.updateFeatureFlowComponent(req, next, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    addFeatureFlowComponent = (req: Request, res: Response, next: NextFunction) => {
        flowService.addFeatureFlowComponent(req, next, (response) => {
            res.status(200);
            res.json(response);
        })
    }

}