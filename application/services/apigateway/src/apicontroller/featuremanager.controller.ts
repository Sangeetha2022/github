
import * as express from "express";
import { Request, Response } from 'express';
import  {Constants} from '../config/Constants';
import { ApiAdaptar } from '../config/apiAdaptar';
import Controller from '../interfaces/controller.interface';
import { EntityController } from './entity.controller';


const entityController = new EntityController();

class FeatureController implements Controller {

    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {

        this.router.post('/feature/save', this.saveFeature);
        this.router.put('/feature/update', this.updateFeature);
        this.router.get('/feature/getall', this.getAllFeature);
        this.router.get('/feature/get', this.getFeatureById);
        this.router.delete('/feature/delete', this.deleteFeature);
        this.router.delete('/feature/deletebyproject/:id', this.deleteProjectFeature);
        this.router.get('/feature/project/get', this.getFeatureByProjectId);
        this.router.put('/feature/updateEntity/:featureId', this.featureUpdateEntity)
        this.router.delete('/feature/deleteentity/:featureId/:entityid', this.featuredeleteEntity);
        this.router.post('/feature/copyFlows', this.flowcopy);
        this.router.put('/feature/update/entity', this.updateFeatureEntity);
        this.router.get('/feature/getallcopyflow', this.getallcopyflow);
    }

    public async saveFeature(req: Request, res: Response) {
        try {
            let feature = await Promise.resolve(new ApiAdaptar().post(`${Constants.featureUrl}/feature/save`, req.body));
            req.baseUrl === '/mobile' ? res.send(feature) :
                req.baseUrl === '/desktop' ? res.send(feature) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async updateFeature(req: Request, res: Response) {
        try {
            let feature = await Promise.resolve(new ApiAdaptar().put(`${Constants.featureUrl}/feature/update`, req.body));
            req.baseUrl === '/mobile' ? res.send(feature) :
                req.baseUrl === '/desktop' ? res.send(feature) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getAllFeature(req: Request, res: Response) {
        try {
            let feature = await Promise.resolve(new ApiAdaptar().get(`${Constants.featureUrl}/feature/getall`));
            req.baseUrl === '/mobile' ? res.send(feature) :
                req.baseUrl === '/desktop' ? res.send(feature) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }


    public getFeatureById = async (req: Request, res: Response) => {
        try {
            let feature = await Promise.resolve(new ApiAdaptar().get(`${Constants.featureUrl}/feature/get?featureId=${req.query.featureId}`));
            req.baseUrl === '/mobile' ? res.send(feature) :
                req.baseUrl === '/desktop' ? res.send(feature) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }


    public async deleteFeature(req: Request, res: Response) {
        try {
            let feature = await Promise.resolve(new ApiAdaptar().delete(`${Constants.featureUrl}/feature/delete?featureId=${req.query.featureId}`));
            req.baseUrl === '/mobile' ? res.send(feature) :
                req.baseUrl === '/desktop' ? res.send(feature) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async deleteProjectFeature(req: Request, res: Response) {
        try {
            let feature = await Promise.resolve(new ApiAdaptar().delete(`${Constants.featureUrl}/feature/deletebyproject/${req.params.id}`));
            req.baseUrl === '/mobile' ? res.send(feature) :
                req.baseUrl === '/desktop' ? res.send(feature) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }


    public async getFeatureByProjectId(req: Request, res: Response) {
        try {
            let feature = await Promise.resolve(new ApiAdaptar().get(`${Constants.featureUrl}/feature/project/get?projectId=${req.query.projectId}`));
            res.send(feature);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }


    public async featureUpdateEntity(req: Request, res: Response) {
        try {
            let feature = await Promise.resolve(new ApiAdaptar().put(`${Constants.featureUrl}/feature/updateEntity/${req.params.featureId}`, req.body));
            res.send(feature);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }


    public async featuredeleteEntity(req: Request, res: Response) {
        try {
            let feature = await Promise.resolve(new ApiAdaptar().get(`${Constants.featureUrl}/feature/deleteentity/${req.params.featureId}/${req.params.entityid}`));
            res.send(feature);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async flowcopy(req: Request, res: Response) {
        try {
            let feature = await Promise.resolve(new ApiAdaptar().post(`${Constants.featureUrl}/feature/copyFlows`, req.body));
            req.baseUrl === '/mobile' ? res.send(feature) :
                req.baseUrl === '/desktop' ? res.send(feature) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async updateFeatureEntity(req: Request, res: Response) {
        try {
            let feature = await Promise.resolve(new ApiAdaptar().put(`${Constants.featureUrl}/feature/update/entity?featureId=${req.query.featureId}`, req.body));
            req.baseUrl === '/mobile' ? res.send(feature) :
                req.baseUrl === '/desktop' ? res.send(feature) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getallcopyflow(req: Request, res: Response) {
        try {
            let copyflowlist = await Promise.resolve(new ApiAdaptar().get(`${Constants.featureUrl}/feature/getallcopyflow`));
            req.baseUrl === '/mobile' ? res.send(copyflowlist) :
                req.baseUrl === '/desktop' ? res.send(copyflowlist) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }
}
export { FeatureController };
