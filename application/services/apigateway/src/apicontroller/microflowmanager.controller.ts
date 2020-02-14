import * as express from "express";
import { Request, Response } from 'express';
import  {Constants} from '../config/Constants';
import { ApiAdaptar } from '../config/apiAdaptar';
import Controller from '../interfaces/controller.interface';
import { EntityController } from './entity.controller';


const entityController = new EntityController();

class MicroflowController implements Controller {

    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {


        this.router.post('/microflow/save', this.saveMicroFlow);
        this.router.put('/microflow/update', this.updateMicroFlow);
        this.router.get('/microflow/getall', this.getAllMicroFlow);
        this.router.get('/microflow/get', this.getMicroFlowByID);
        this.router.post('/microflow/component/get', this.getMicroFlow);
        this.router.post('/microflow/component/backend/get', this.getBackendMicroFlow);
        this.router.get('/microflow/project/get', this.getMicroFlowByProjectId);
        this.router.delete('/microflow/delete', this.deleteMicroFlow);

    }

    public saveMicroFlow(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.featureUrl}/microflow/save`, req.body).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public updateMicroFlow(req: Request, res: Response) {
        new ApiAdaptar().put(`${Constants.microUrl}/microflow/update`, req.body).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public deleteMicroFlow(req: Request, res: Response) {
        new ApiAdaptar().delete(`${Constants.microUrl}/microflow/delete?microflowId=${req.query.microflowId}`).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public getAllMicroFlow(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.microUrl}/microflow/getall`).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public getMicroFlowByID(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.microUrl}/microflow/get?microflowId=${req.query.microflowId}`).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public getMicroFlow(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.microUrl}/microflow/component/get`, req.body).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }



    public getBackendMicroFlow(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.microUrl}/microflow/component/backend/get`, req.body).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public getMicroFlowByProjectId(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.microUrl}/microflow/project/get?projectId=${req.query.projectId}`).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }


}
export { MicroflowController };