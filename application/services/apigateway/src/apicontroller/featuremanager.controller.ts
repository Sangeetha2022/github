
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

    public saveFeature(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.featureUrl}/feature/save`, req.body).then(feature => {
            req.baseUrl === '/mobile' ? res.send(feature) :
                req.baseUrl === '/desktop' ? res.send(feature) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public updateFeature(req: Request, res: Response) {
        new ApiAdaptar().put(`${Constants.featureUrl}/feature/update`, req.body).then(feature => {
            req.baseUrl === '/mobile' ? res.send(feature) :
                req.baseUrl === '/desktop' ? res.send(feature) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public getAllFeature(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.featureUrl}/feature/getall`).then(feature => {
            req.baseUrl === '/mobile' ? res.send(feature) :
                req.baseUrl === '/desktop' ? res.send(feature) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }


    public getFeatureById = (req: Request, res: Response) => {
        new ApiAdaptar().get(`${Constants.featureUrl}/feature/get?featureId=${req.query.featureId}`).then(feature => {
            req.baseUrl === '/mobile' ? res.send(feature) :
                req.baseUrl === '/desktop' ? res.send(feature) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }


    public deleteFeature(req: Request, res: Response) {
        new ApiAdaptar().delete(`${Constants.featureUrl}/feature/delete?featureId=${req.query.featureId}`).then(feature => {
            req.baseUrl === '/mobile' ? res.send(feature) :
                req.baseUrl === '/desktop' ? res.send(feature) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public deleteProjectFeature(req: Request, res: Response) {
        new ApiAdaptar().delete(`${Constants.featureUrl}/feature/deletebyproject/${req.params.id}`).then(feature => {
            req.baseUrl === '/mobile' ? res.send(feature) :
                req.baseUrl === '/desktop' ? res.send(feature) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }


    public getFeatureByProjectId(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.featureUrl}/feature/project/get?projectId=${req.query.projectId}`).then(feature => {
            res.send(feature);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }


    public featureUpdateEntity(req: Request, res: Response) {
        new ApiAdaptar().put(`${Constants.featureUrl}/feature/updateEntity/${req.params.featureId}`, req.body).then(feature => {
            res.send(feature);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }


    public featuredeleteEntity(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.featureUrl}/feature/deleteentity/${req.params.featureId}/${req.params.entityid}`).then(feature => {
            res.send(feature);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public flowcopy(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.featureUrl}/feature/copyFlows`, req.body).then(feature => {
            req.baseUrl === '/mobile' ? res.send(feature) :
                req.baseUrl === '/desktop' ? res.send(feature) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        })
    }

    public updateFeatureEntity(req: Request, res: Response) {
        new ApiAdaptar().put(`${Constants.featureUrl}/feature/update/entity?featureId=${req.query.featureId}`, req.body).then(feature => {
            req.baseUrl === '/mobile' ? res.send(feature) :
                req.baseUrl === '/desktop' ? res.send(feature) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        })
    }

    public getallcopyflow(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.featureUrl}/feature/getallcopyflow`).then(copyflowlist => {
            req.baseUrl === '/mobile' ? res.send(copyflowlist) :
                req.baseUrl === '/desktop' ? res.send(copyflowlist) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }
}
export { FeatureController };
