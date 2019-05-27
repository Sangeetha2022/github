import * as express from "express";
import { Request, Response } from 'express';
import * as Constants from '../config/Constants';
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
        new ApiAdaptar().post(`${Constants.featureUrl}/microflow/save`, req.body).then(micro => {
            res.send(micro);
        }).catch(err => {
            res.send(err);
        });
    }

    public updateMicroFlow(req: Request, res: Response) {
        new ApiAdaptar().put(`${Constants.microUrl}/microflow/update`, req.body).then(micro => {
            res.send(micro);
        }).catch(err => {
            res.send(err);
        });
    }

    public deleteMicroFlow(req: Request, res: Response) {
        new ApiAdaptar().delete(`${Constants.microUrl}/microflow/delete?microflowId=${req.query.microflowId}`).then(micro => {
            res.send(micro);
        }).catch(err => {
            res.send(err);
        });
    }

    public getAllMicroFlow(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.microUrl}/microflow/getall`).then(allmicro => {
            res.send(allmicro);
        }).catch(err => {
            res.send(err);
        });
    }

    public getMicroFlowByID(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.microUrl}/microflow/get?microflowId=${req.query.microflowId}`).then(result => {
            res.send(result)
        }).catch(err => {
            res.send(err);
        });
    }

    public getMicroFlow(req: Request, res: Response) {
        console.log('api get microflows id are --11-- ', req.body);
        console.log('api get microflows id are --22-- ', `${Constants.microUrl}/microflow/component/get`);
        new ApiAdaptar().post(`${Constants.microUrl}/microflow/component/get`, req.body).then(result => {
            res.send(result)
        }).catch(err => {
            res.send(err);
        });
    }



    public getBackendMicroFlow(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.microUrl}/microflow/component/backend/get`, req.body).then(result => {
            res.send(result)
        }).catch(err => {
            res.send(err);
        });
    }

    public getMicroFlowByProjectId(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.microUrl}/microflow/project/get?projectId=${req.query.projectId}`).then(result => {
            res.send(result)
        }).catch(err => {
            res.send(err);
        });
    }


}
export { MicroflowController };