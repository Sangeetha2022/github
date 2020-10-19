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

    public async saveMicroFlow(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().post(`${Constants.featureUrl}/microflow/save`, req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async updateMicroFlow(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().put(`${Constants.microUrl}/microflow/update`, req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async deleteMicroFlow(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().delete(`${Constants.microUrl}/microflow/delete?microflowId=${req.query.microflowId}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getAllMicroFlow(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().get(`${Constants.microUrl}/microflow/getall`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
        
    }

    public async getMicroFlowByID(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().get(`${Constants.microUrl}/microflow/get?microflowId=${req.query.microflowId}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getMicroFlow(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().post(`${Constants.microUrl}/microflow/component/get`, req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }



    public async getBackendMicroFlow(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().post(`${Constants.microUrl}/microflow/component/backend/get`, req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getMicroFlowByProjectId(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().get(`${Constants.microUrl}/microflow/project/get?projectId=${req.query.projectId}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }


}
export { MicroflowController };