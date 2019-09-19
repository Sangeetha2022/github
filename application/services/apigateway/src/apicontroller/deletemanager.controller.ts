
import * as express from "express";
import { Request, Response } from 'express';
import * as Constants from '../config/Constants';
import { ApiAdaptar } from '../config/apiAdaptar';
import Controller from '../interfaces/controller.interface';



class DeleteManagerController implements Controller {

    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.delete('/delete/project/:id', this.deleteProject);
        this.router.delete('/delete/entity/:id', this.deleteEntity);
        this.router.delete('/delete/feature/:id', this.deleteFeature);
        this.router.delete('/delete/menu/:id', this.deleteMenu);
        this.router.delete('/delete/screen/:id', this.deleteScreen);
        this.router.delete('/delete/flow/:id', this.deleteFlow);

    }


    public deleteProject(req: Request, res: Response) {
        new ApiAdaptar().delete(Constants.deleteUrl + '/delete/project/' + req.params.id).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public deleteEntity(req: Request, res: Response) {
        new ApiAdaptar().delete(Constants.deleteUrl + '/delete/entity/' + req.params.id).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public deleteFeature(req: Request, res: Response) {
        new ApiAdaptar().delete(Constants.deleteUrl + '/delete/feature/' + req.params.id).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public deleteMenu(req: Request, res: Response) {
        new ApiAdaptar().delete(Constants.deleteUrl + '/delete/menu/' + req.params.id).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public deleteScreen(req: Request, res: Response) {
        new ApiAdaptar().delete(Constants.deleteUrl + '/delete/screen/' + req.params.id).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public deleteFlow(req: Request, res: Response) {
        new ApiAdaptar().delete(Constants.deleteUrl + '/delete/flow/' + req.params.id).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

}

export { DeleteManagerController };
