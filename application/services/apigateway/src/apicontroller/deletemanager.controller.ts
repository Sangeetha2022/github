
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
        this.router.delete('/delete/projectflow/:id', this.deleteProjectFlow);
        this.router.delete('/delete/entityflow/:id', this.deleteEntityFlow);
        this.router.delete('/delete/featureflow/:id', this.deleteFeatureFlow);
        this.router.delete('/delete/menuflow/:id', this.deleteMenuFlow);
        this.router.delete('/delete/screenflow/:id', this.deleteScreenFlow);

    }


    public deleteProjectFlow(req: Request, res: Response) {
        new ApiAdaptar().delete(Constants.deleteUrl + '/delete/projectflow/' + req.params.id).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public deleteEntityFlow(req: Request, res: Response) {
        new ApiAdaptar().delete(Constants.deleteUrl + '/delete/entityflow/' + req.params.id).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public deleteFeatureFlow(req: Request, res: Response) {
        new ApiAdaptar().delete(Constants.deleteUrl + '/delete/featureflow/' + req.params.id).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public deleteMenuFlow(req: Request, res: Response) {
        new ApiAdaptar().delete(Constants.deleteUrl + '/delete/menuflow/' + req.params.id).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public deleteScreenFlow(req: Request, res: Response) {
        new ApiAdaptar().delete(Constants.deleteUrl + '/delete/screenflow/' + req.params.id).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

}

export { DeleteManagerController };
