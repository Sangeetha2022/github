
import * as express from "express";
import { Request, Response } from 'express';
import * as Constants from '../config/Constants';
import { ApiAdaptar } from '../config/ApiAdaptar';
import Controller from '../interfaces/controller.interface';

class ProjectController implements Controller {

    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/projects/my/add', this.addProject);
        this.router.put('/projects/my/:id/update', this.updateProject);
        this.router.get('/projects/my/getall', this.getAllMyProject);
        this.router.get('/projects/my/:id/get', this.getByProjectId);
        this.router.delete('/projects/my/:id/delete', this.deleteProject);
    }

    public addProject(req: Request, res: Response) {
        new ApiAdaptar().post(Constants.projectUrl + '/projects/my/add', req.body).then(proj => {
            res.send(proj);
        }).catch(err => {
            res.send(err);
        });;
    }

    public updateProject(req: Request, res: Response) {
        new ApiAdaptar().put(Constants.projectUrl + '/projects/my/update/' + req.params.id, req.body).then(proj => {
            res.send(proj);
        }).catch(err => {
            res.send(err);
        });
    }

    public deleteProject(req: Request, res: Response) {
        new ApiAdaptar().delete(Constants.projectUrl + '/projects/my/delete' + req.params.id).then(proj => {
            res.send(proj);
        }).catch(err => {
            res.send(err);
        });
    }

    public getAllMyProject(req: Request, res: Response) {
        new ApiAdaptar().get(Constants.projectUrl + '/projects/my/getall').then(allproject => {
            res.send(allproject);
        }).catch(err => {
            res.send(err);
        });
    }

    public getByProjectId = (req: Request, res: Response) => {
        new ApiAdaptar().get(Constants.projectUrl + '/projects/my/getbyid/' + req.params.id).then(proj => {
            req.baseUrl === '/mobile' ? res.send(proj) :
            req.baseUrl === '/desktop' ? res.send(proj) : res.send(null)
        }).catch(err => {
            res.send(err);
        });
    }

}

export { ProjectController };
