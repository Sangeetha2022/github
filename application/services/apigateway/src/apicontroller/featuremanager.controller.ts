
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


        // Feature
        // app.route('/feature/save').post(this.featureController.saveFeature);
        // app.route('/feature/update').put(this.featureController.updateFeature);
        // app.route('/feature/getall').get(this.featureController.getAllFeature);
        // app.route('/feature/get').get(this.featureController.getFeatureById);
        // app.route('/feature/delete').delete(this.featureController.deleteFeature);
        // app.route('/feature/project/get').get(this.featureController.getFeatureByProjectId);

        this.router.post('/feature/save', this.saveFeature);
        this.router.put('/feature/update', this.updateFeature);
        this.router.get('/feature/getall', this.getAllFeature);
        this.router.get('/feature/get', this.getFeatureById);
        this.router.delete('/feature/delete', this.deleteFeature);
        this.router.get('/feature/project/get', this.getFeatureByProjectId);

        // // Feature Details
        // this.router.post('/feature/details/addfile', this.uploadeFeaturefile);
        // this.router.get('/feature/details/getall', this.getAllFeatureDetails);
        // this.router.get('/feature/details/getbyid/:id', this.getFeatureDetailsById);
        // this.router.get('/feature/details/getFeatureById/:id', this.getFeatureDetailsByFeatureid);
        // this.router.get('/feature/details/getentitybyfeatureid/:id', this.getFeatureEntityByFeatureid);

        // //Feature flow
        // this.router.get('/feature-flow/getFeatureById/:id', this.getAllFeatureFlowByFeatureId);



    }

    public saveFeature(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.featureUrl}/feature/save`, req.body).then(feature => {
            res.send(feature);
        }).catch(err => {
            res.send(err);
        });
    }

     public updateFeature(req: Request, res: Response) {
        new ApiAdaptar().put(`${Constants.featureUrl}/feature/update`,req.body).then(feature => {
            res.send(feature);
        }).catch(err => {
            res.send(err);
        });
    }

     public getAllFeature(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.featureUrl}/feature/getall`).then(feature => {
            res.send(feature);
        }).catch(err => {
            res.send(err);
        });
    }


     public getFeatureById = (req: Request, res: Response) => {
        new ApiAdaptar().get(`${Constants.featureUrl}/feature/get?featureId=${req.query.featureId}`).then(feature => {
            // req.baseUrl === '/mobile' ? res.send(feature) :
            //     req.baseUrl === '/desktop' ? res.send(feature) : res.send(null)
            res.send(feature);
        }).catch(err => {
            res.send(err);
        });
    }


    public deleteFeature(req: Request, res: Response) {
        new ApiAdaptar().delete(`${Constants.featureUrl}/feature/delete?featureId=${req.query.featureId}`).then(feature => {
            res.send(feature);
        }).catch(err => {
            res.send(err);
        });
    }


    public getFeatureByProjectId(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.featureUrl}/feature/project/get?projectId=${req.query.projectId}`).then(feature => {
            res.send(feature);
        }).catch(err => {
            res.send(err);
        });
    }


    // public uploadeFeaturefile(req: Request, res: Response) {
    //     new ApiAdaptar().post(`${Constants.featureUrl}/feature/details/addfile`, req.body).then(feature => {
    //         res.send(feature);
    //     }).catch(err => {
    //         res.send(err);
    //     });
    // }


    // public getAllFeatureDetails(req: Request, res: Response) {
    //     new ApiAdaptar().get(`${Constants.featureUrl}/feature/details/getall`).then(feature => {
    //         res.send(feature);
    //     }).catch(err => {
    //         res.send(err);
    //     });
    // }


    // public getFeatureDetailsById(req: Request, res: Response) {
    //     new ApiAdaptar().get(`${Constants.featureUrl}/feature/details/getbyid/${req.params.id}`).then(feature => {
    //         res.send(feature);
    //     }).catch(err => {
    //         res.send(err);
    //     });
    // }


    // public getFeatureDetailsByFeatureid(req: Request, res: Response) {
    //     new ApiAdaptar().get(`${Constants.featureUrl}/feature/details/getFeatureById/${req.params.id}`).then(feature => {
    //         res.send(feature);
    //     }).catch(err => {
    //         res.send(err);
    //     });
    // }


    // public getFeatureEntityByFeatureid(req: Request, res: Response) {
    //     new ApiAdaptar().get(`${Constants.featureUrl}/feature/details/getentitybyfeatureid/${req.params.id}`).then(feature => {
    //         res.send(feature);
    //     }).catch(err => {
    //         res.send(err);
    //     });
    // }

  

   


   

   
    // public getAllFeatureFlowByFeatureId(req: Request, res: Response) {
    //     new ApiAdaptar().get(`${Constants.featureUrl}/feature-flow/getFeatureById/${req.params.id}`).then(feature => {
    //         res.send(feature);
    //     }).catch(err => {
    //         res.send(err);
    //     });
    // }
}
export { FeatureController };
