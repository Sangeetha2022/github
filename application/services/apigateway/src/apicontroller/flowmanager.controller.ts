
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
        this.router.post('/flow/save', this.saveFlow);
        this.router.put('/flow/update', this.updateFlow);
        this.router.get('/flow/getall', this.getAllFlow);
        this.router.get('/flow/get', this.getFlowById);
        this.router.post('/flow/feature/get', this.getFeatureFlows);
        this.router.post('/flow/feature/language/get', this.getFeatureFlows);
        this.router.get('/flow/project/get', this.getFlowByProjectId);
        this.router.delete('/flow/delete', this.deleteFlow);
    }

    public saveFlow(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.flowUrl}/flow/save`, req.body)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })
    }

    public updateFlow(req: Request, res: Response) {
        new ApiAdaptar().put(`${Constants.flowUrl}/flow/update`, req.body)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })
    }

    public getAllFlow(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.flowUrl}/flow/getall`)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })
    }

    public getFlowById(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.flowUrl}/flow/get?flowId=${req.query.flowId}`)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })
    }

    public getFeatureFlows(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.flowUrl}/flow/feature/get`, req.body)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })
    }


    public getFeatureFlowsByLanguage(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.flowUrl}/flow/feature/language/get?language=${req.query.language}`, req.body)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })
    }

    public getFlowByProjectId(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.flowUrl}/flow/project/get?projectId=${req.query.projectId}`)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })
    }

    public deleteFlow(req: Request, res: Response) {
        new ApiAdaptar().delete(`${Constants.flowUrl}/flow/delete?flowId=${req.query.flowId}`)
            .then(flow => {
                req.baseUrl === '/mobile' ? res.send(flow) :
                    req.baseUrl === '/desktop' ? res.send(flow) : res.send(null);
            }).catch(err => {
                req.baseUrl === '/mobile' ? res.send(err) :
                    req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
            })
    }



}

export { FlowManagerController };
