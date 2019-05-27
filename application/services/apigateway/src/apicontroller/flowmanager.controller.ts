
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
        // this.router.post('/flowmanager/flow/add', this.addFlow);
        // this.router.get('/flowmanager/flow/getall', this.getAllMyFlow);
        // this.router.get('/flowmanager/flow/:id/get', this.getByFlowId);
        // this.router.put('/flowmanager/flow/:id/update', this.updateFlow);
        // this.router.delete('/flowmanager/flow/:id/delete', this.deleteFlow);
        // this.router.get('/flow/get/:name/name', this.getFlowByName);

        this.router.post('/flow/save', this.saveFlow);
        this.router.put('/flow/update', this.updateFlow);
        this.router.get('/flow/getall', this.getAllFlow);
        this.router.get('/flow/get', this.getFlowById);
        this.router.post('/flow/feature/get', this.getFeatureFlows);
        this.router.post('/flow/feature/language/get', this.getFeatureFlows);
        // this.router.post('/flow/feature/backend/get', this.getBackendFlow);
        this.router.get('/flow/project/get', this.getFlowByProjectId);
        this.router.delete('/flow/delete', this.deleteFlow);
    }

    // new ApiAdaptar().put(`${Constants.entityUrl}/entity/update`, req.body).then((response) => {


    public saveFlow(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.flowUrl}/flow/save`, req.body)
            .then(flow => {
                res.send(flow);
            }).catch(err => {
                res.send(err);
            })
    }

    public updateFlow(req: Request, res: Response) {
        new ApiAdaptar().put(`${Constants.flowUrl}/flow/update`, req.body)
            .then(flow => {
                res.send(flow);
            }).catch(err => {
                res.send(err);
            })
    }

    public getAllFlow(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.flowUrl}/flow/getall`)
            .then(flow => {
                res.send(flow);
            }).catch(err => {
                res.send(err);
            })
    }

    public getFlowById(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.flowUrl}/flow/get?flowId=${req.query.flowId}`)
            .then(flow => {
                res.send(flow);
            }).catch(err => {
                res.send(err);
            })
    }

    public getFeatureFlows(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.flowUrl}/flow/feature/get`, req.body)
            .then(flow => {
                res.send(flow);
            }).catch(err => {
                res.send(err);
            })
    }


    public getFeatureFlowsByLanguage(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.flowUrl}/flow/feature/language/get?language=${req.query.language}`, req.body)
            .then(flow => {
                res.send(flow);
            }).catch(err => {
                res.send(err);
            })
    }

    // public getBackendFlow(req: Request, res: Response) {
    //     new ApiAdaptar().post(`${Constants.flowUrl}/flow/feature/backend/get`, req.body)
    //         .then(flow => {
    //             res.send(flow);
    //         }).catch(err => {
    //             res.send(err);
    //         })
    // }


    public getFlowByProjectId(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.flowUrl}/flow/project/get?projectId=${req.query.projectId}`)
            .then(flow => {
                res.send(flow);
            }).catch(err => {
                res.send(err);
            })
    }

    public deleteFlow(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.flowUrl}/flow/delete?flowId=${req.query.flowId}`)
            .then(flow => {
                res.send(flow);
            }).catch(err => {
                res.send(err);
            })
    }

    

}

export { FlowManagerController };
