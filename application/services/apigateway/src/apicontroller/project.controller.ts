
import * as express from "express";
import { Request, Response } from 'express';
import * as Constants from '../config/Constants';
import { ApiAdaptar } from '../config/apiAdaptar';
import Controller from '../interfaces/controller.interface';
import { EntityController } from './entity.controller';


const entityController = new EntityController();

class ProjectController implements Controller {

    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/projects/add', this.addProject);
        this.router.put('/projects/:id/update', this.updateProject);
        this.router.get('/projects/getall', this.getAllMyProject);
        this.router.get('/projects/:id/get', this.getByProjectId);
        this.router.delete('/projects/delete/:id', this.deleteProject);
    }

    public addProject(req: Request, res: Response) {
        console.log('entering into add project api gateway')
        new ApiAdaptar().post(Constants.projectUrl + '/projects/add', req.body).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public updateProject(req: Request, res: Response) {
        new ApiAdaptar().put(Constants.projectUrl + '/projects/update/' + req.params.id, req.body).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public deleteProject(req: Request, res: Response) {
        console.log('delete project url in project controller -------- ', Constants.projectUrl + '/projects/my/delete' + req.params.id)
        new ApiAdaptar().delete(Constants.projectUrl + '/projects/delete/' + req.params.id).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public getAllMyProject(req: Request, res: Response) {
        new ApiAdaptar().get(Constants.projectUrl + '/projects/getall').then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public getByProjectId = (req: Request, res: Response) => {
        console.log('entering into method')
        new ApiAdaptar().get(Constants.projectUrl + '/projects/getbyid/' + req.params.id).then(result => {
            console.log('reponse in main method')
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

}

export { ProjectController };
