import * as mongoose from 'mongoose';
import { FlowSchema } from '../models/ProjectModel';
import { Request, Response } from 'express';
import { ProjectService } from '../services/ProjectService';

const Project = mongoose.model('Project', FlowSchema);
let projectService = new ProjectService()

export class ProjectController {

    public addProject(req: Request, res: Response) {

        projectService.addProject(req, (user) => {
            res.status(200); // status for the response
            res.json(user); 
        })
    }

    public getAllProject(req: Request, res: Response) {
        projectService.getAllProject(req, (user) => {
            res.status(200); // status for the response
            res.json(user); 
        })
    }

    public getProjectByID(req: Request, res: Response) {
        projectService.getProjectByID(req, (user) => {
            res.status(200); // status for the response
            res.json(user); 
        })
    }

    public updateProject(req: Request, res: Response) {
        projectService.updateProject(req, (user) => {
            res.status(200); // status for the response
            res.json(user); 
        })
    }

    public deleteProject(req: Request, res: Response) {
        projectService.deleteProject(req, (user) => {
            res.status(200); // status for the response
            res.json(user); 
        })
    }

}