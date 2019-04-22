
import * as express from "express";
import { Request, Response } from 'express';
import * as Constants from '../config/Constants';
import { ApiAdaptar } from '../config/apiAdaptar';
import Controller from '../interfaces/controller.interface';

class FlowManagerController implements Controller {

    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/flowmanager/flow/add', this.addFlow);
        this.router.get('/flowmanager/flow/getall', this.getAllMyFlow);
        this.router.get('/flowmanager/flow/:id/get', this.getByFlowId);
        this.router.put('/flowmanager/flow/:id/update', this.updateFlow);
        this.router.delete('/flowmanager/flow/:id/delete', this.deleteFlow);
        this.router.get('/flow/get/:name/name', this.getFlowByName);
    }

    // new ApiAdaptar().put(`${Constants.entityUrl}/entity/update`, req.body).then((response) => {


    public getFlowByName(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.flowUrl}/flow/get/${req.params.name}/name`)
            .then(flow => {
                res.send(flow);
            }).catch(err => {
                res.send(err);
            })
    }

    public addFlow(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.flowUrl}/flow/save`, req.body).then(flow => {
            req.baseUrl === '/mobile' ? res.send(flow) :
                req.baseUrl === '/desktop' ? res.send(flow) :
                    res.send(null);
        }).catch(err => {
            res.send(err);
        });;
    }

    public updateFlow(req: Request, res: Response) {
        new ApiAdaptar().put(`${Constants.flowUrl}/flowmanager/flow/getall}${req.params.id}`, req.body).then(flow => {
            req.baseUrl === '/mobile' ? res.send(flow) :
                req.baseUrl === '/desktop' ? res.send(flow) :
                    res.send(null);
        }).catch(err => {
            res.send(err);
        });
    }

    public deleteFlow(req: Request, res: Response) {
        new ApiAdaptar().delete(`${Constants.flowUrl}/flowmanager/flow/:id/get ${req.params.id}`).then(flow => {
            req.baseUrl === '/mobile' ? res.send(flow) :
                req.baseUrl === '/desktop' ? res.send(flow) :
                    res.send(null);
        }).catch(err => {
            res.send(err);
        });
    }

    public getAllMyFlow(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.flowUrl}/flow/getall`).then(allflow => {
            req.baseUrl === '/mobile' ? res.send(allflow) :
                req.baseUrl === '/desktop' ? res.send(allflow) :
                    res.send(null);
        }).catch(err => {
            res.send(err);
        });
    }

    public getByFlowId = (req: Request, res: Response) => {
        new ApiAdaptar().get(`${Constants.flowUrl}/flow/getbyid/ ${req.params.id}`).then(flow => {
            req.baseUrl === '/mobile' ? res.send(flow) :
                req.baseUrl === '/desktop' ? res.send(flow) :
                    res.send(null);
        }).catch(err => {
            res.send(err);
        });
    }

}

export { FlowManagerController };
