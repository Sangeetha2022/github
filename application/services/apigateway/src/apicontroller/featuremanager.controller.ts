
import * as express from "express";
import { Request, Response } from 'express';
import * as Constants from '../config/Constants';
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

        this.router.post('/feature/save', this.addFeature);
        this.router.put('/feature/update/:id', this.updateFeature);
        this.router.get('/feature/getall', this.getAllMyFeature);
        this.router.get('/feature/getbyid/:id', this.getByFeatureId);
        this.router.delete('/feature/delete/:id', this.deleteFeature);
        this.router.get('/feature/getbyprojectid/:id', this.getFeatureByProjectId);

        // Feature Details
        this.router.post('/feature/details/addfile', this.uploadeFeaturefile);
        this.router.get('/feature/details/getall', this.getAllFeatureDetails);
        this.router.get('/feature/details/getbyid/:id', this.getFeatureDetailsById);
        this.router.get('/feature/details/getbyfeatureid/:id', this.getFeatureDetailsByFeatureid);
        this.router.get('/feature/details/getentitybyfeatureid/:id', this.getFeatureEntityByFeatureid);


    }

    public getFeatureByProjectId(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.featureUrl}/feature/getbyprojectid/${req.params.id}`).then(feature => {
            res.send(feature);
        }).catch(err => {
            res.send(err);
        });
    }


    public uploadeFeaturefile(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.featureUrl}/feature/details/addfile`, req.body).then(feature => {
            res.send(feature);
        }).catch(err => {
            res.send(err);
        });
    }


    public getAllFeatureDetails(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.featureUrl}/feature/details/getall`).then(feature => {
            res.send(feature);
        }).catch(err => {
            res.send(err);
        });
    }


    public getFeatureDetailsById(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.featureUrl}/feature/details/getbyid/${req.params.id}`).then(feature => {
            res.send(feature);
        }).catch(err => {
            res.send(err);
        });
    }


    public getFeatureDetailsByFeatureid(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.featureUrl}/feature/details/getbyfeatureid/${req.params.id}`).then(feature => {
            res.send(feature);
        }).catch(err => {
            res.send(err);
        });
    }


    public getFeatureEntityByFeatureid(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.featureUrl}/feature/details/getentitybyfeatureid/${req.params.id}`).then(feature => {
            res.send(feature);
        }).catch(err => {
            res.send(err);
        });
    }

    public addFeature(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.featureUrl}/feature/save`, req.body).then(feature => {
            res.send(feature);
        }).catch(err => {
            res.send(err);
        });
    }

    public updateFeature(req: Request, res: Response) {
        new ApiAdaptar().put(`${Constants.featureUrl}/feature/update/:id ${req.params.id}`,req.body).then(feature => {
            res.send(feature);
        }).catch(err => {
            res.send(err);
        });
    }

    public deleteFeature(req: Request, res: Response) {
        new ApiAdaptar().delete(`${Constants.featureUrl}/feature/delete/:id ${req.params.id}`).then(feature => {
            res.send(feature);
        }).catch(err => {
            res.send(err);
        });
    }

    public getAllMyFeature(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.featureUrl}/feature/getall`).then(allfeatureect => {
            res.send(allfeatureect);
        }).catch(err => {
            res.send(err);
        });
    }

    public getByFeatureId = (req: Request, res: Response) => {
        new ApiAdaptar().get(`${Constants.featureUrl}/feature/getbyid/:id ${req.params.id}`).then(feature => {
            req.baseUrl === '/mobile' ? res.send(feature) :
                req.baseUrl === '/desktop' ? res.send(feature) : res.send(null)
        }).catch(err => {
            res.send(err);
        });
    }
}
export { FeatureController };
