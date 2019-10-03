import { Request, Response, NextFunction } from 'express';
import { ProjectFlowService } from '../services/ProjectFlowService';

const projectFlowService = new ProjectFlowService();
export class ProjectFlowController {
   
    public ProjectFlow(req: Request, res: Response) {
        projectFlowService.ProjectFlow(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
   
    public createProjectFlow(req: Request, res: Response) {
        projectFlowService.createProjectFlow(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }


    public getProjectFlowById(req: Request, res: Response) {
        projectFlowService.getProjectFlowById(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }


    public updateFlowComponents(req: Request, res: Response) {
        projectFlowService.updateFlowComponents(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }


    public getAllProjectFlow(req: Request, res: Response) {
        projectFlowService.getAllProjectFlow(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }


    public getProjectFeatureFlows(req: Request, res: Response) {
        projectFlowService.getProjectFeatureFlows(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }


    public deleteProjectFlow(req: Request, res: Response) {
        projectFlowService.deleteProjectFlow(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }
}