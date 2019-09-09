
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
        this.router.get('/projects/getall', this.getAllProject);
        this.router.get('/projects/getbyid/:id', this.getByProjectId);
        this.router.put('/projects/update/:id', this.updateProject);
        this.router.delete('/projects/delete/:id', this.deleteProject);
        this.router.get('/projects/getbyuserid/:id', this.getProjectByUserId);
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
        new ApiAdaptar().delete(Constants.projectUrl + '/projects/delete/' + req.params.id).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public getProjectByUserId(req: Request, res: Response) {
        console.log('enteirng into get project by userid are -----  ', Constants.projectUrl + '/projects/getbyuserid/' + req.params.id)
        new ApiAdaptar().get(Constants.projectUrl + '/projects/getbyuserid/' + req.params.id).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public getAllProject(req: Request, res: Response) {
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
