
import * as express from "express";
import { Request, Response } from 'express';
import { Constants } from '../config/Constants';
import { ApiAdapter } from '../config/apiAdapter';
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



    public async addProject(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdapter().post(Constants.projectUrl + '/projects/add' + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);

        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);

        }
    }

    public async updateProject(req: Request, res: Response) {

        try {
            let result = await Promise.resolve(new ApiAdapter().put(Constants.projectUrl + '/projects/update/' + req.params.id + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);

        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async deleteProject(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdapter().delete(Constants.projectUrl + '/projects/delete/' + req.params.id + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);

        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getProjectByUserId(req: Request, res: Response) {
        console.log('enteirng into get project by userid are -----  ', Constants.projectUrl + '/projects/getbyuserid/' + req.params.id)
        try {
            let result = await Promise.resolve(new ApiAdapter().get(Constants.projectUrl + '/projects/getbyuserid/' + req.params.id + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);

        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getAllProject(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdapter().get(Constants.projectUrl + '/projects/getall' + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);

        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public getByProjectId = async (req: Request, res: Response) => {
        console.log('entering into method')
        try {
            let result = await Promise.resolve(new ApiAdapter().get(Constants.projectUrl + '/projects/getbyid/' + req.params.id + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);

        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

}

export { ProjectController };
