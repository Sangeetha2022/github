import { Request, Response } from 'express';
import { ProjectMicroFlowService } from '../services/ProjectMircoFlowService';

let projectMicroFlowService = new ProjectMicroFlowService()

export class ProjectMicroFlowController {

    public saveProjectMicroFlow(req: Request, res: Response) {
        projectMicroFlowService.saveProjectMicroFlow(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public updateProjectMicroFlow(req: Request, res: Response) {
        projectMicroFlowService.updateProjectMicroFlow(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public getAllProjectMicroFlow(req: Request, res: Response) {
        projectMicroFlowService.getAllProjectMicroFlow(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public getProjectMicroFlowByID(req: Request, res: Response) {
        projectMicroFlowService.getProjectMicroFlowByID(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public getProjectMicroFlow(req: Request, res: Response) {
        projectMicroFlowService.getProjectMicroFlow(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

     public getBackendProjectMicroFlow(req: Request, res: Response) {
        projectMicroFlowService.getBackendProjectMicroFlow(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public getProjectMicroFlowByProjectId(req: Request, res: Response) {
        projectMicroFlowService.getProjectMicroFlowByProjectId(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

    public deleteProjectMicroFlow(req: Request, res: Response) {
        projectMicroFlowService.deleteProjectMicroFlow(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }
}