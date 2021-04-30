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

        this.router.post('/microflow/project/save', this.saveProjectMicroFlow);
        this.router.get('/microflow/project/getall', this.getAllProjectMicroFlow);
        this.router.get('/microflow/project/getbyid/:id', this.getProjectMicroFlowByID);
        this.router.post('/microflow/project/delete', this.deleteProjectMicroFlow);
        this.router.put('/microflow/project/update', this.updateProjectMicroFlow);
        this.router.post('/microflow/project/component/get', this.getProjectMicroFlow)

    }

    public async saveMicroFlow(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().post(`${Constants.featureUrl}/microflow/save` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async updateMicroFlow(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().put(`${Constants.microUrl}/microflow/update` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async deleteMicroFlow(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().delete(`${Constants.microUrl}/microflow/delete?microflowId=${req.query.microflowId}` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getAllMicroFlow(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().get(`${Constants.microUrl}/microflow/getall` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
        
    }

    public async getMicroFlowByID(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().get(`${Constants.microUrl}/microflow/get?microflowId=${req.query.microflowId}` + `&log_id=${req.query.log_id}`));

            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getMicroFlow(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().post(`${Constants.microUrl}/microflow/component/get` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getProjectMicroFlow(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().post(`${Constants.microUrl}/microflow/project/component/get` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }



    public async getBackendMicroFlow(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().post(`${Constants.microUrl}/microflow/component/backend/get` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getMicroFlowByProjectId(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().get(`${Constants.microUrl}/microflow/project/get?projectId=${req.query.projectId}` + `&log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async saveProjectMicroFlow(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().post(`${Constants.microUrl}/microflow/project/save` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async updateProjectMicroFlow(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().put(`${Constants.microUrl}/microflow/project/update` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async deleteProjectMicroFlow(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().post(`${Constants.microUrl}/microflow/project/delete` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getAllProjectMicroFlow(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().get(`${Constants.microUrl}/microflow/project/getall` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
        
    }

    public async getProjectMicroFlowByID(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().get(`${Constants.microUrl}/microflow/project/get?microflowId=${req.query.microflowId}` + `&log_id=${req.query.log_id}`));

            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

}
export { MicroflowController };