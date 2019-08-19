
import * as express from "express";
import { Request, Response } from 'express';
import * as Constants from '../config/Constants';
import { ApiAdaptar } from '../config/apiAdaptar';
import Controller from '../interfaces/controller.interface';


class ScreenController implements Controller {

    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/screen/save', this.saveScreen);
        this.router.get('/screen/get', this.getAllScreens);
        this.router.get('/screen/get/:id', this.getScreenById);
        this.router.post('/screen/update/:id', this.updateScreen);
        this.router.delete('/screen/delete/:id', this.deleteScreen);
        this.router.get('/screen/getbyprojectid/:projectId', this.getAllScreenByProjectId);
        this.router.get('/screen/getbyprojectandfeatureid/:projectId/:featureId', this.getAllScreenByProjectAndFeatureId);
        this.router.get('/screen/getbyfeatureid/:id', this.getAllScreenByFeatureId);
        this.router.get('/screen/template', this.getTemplateByProjectId);

    }

    public saveScreen(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.screenUrl}/screen/save`, req.body).then(screen => {
            res.send(screen);
        }).catch(err => {
            res.send(err);
        });
    }


    public getAllScreens(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.screenUrl}/screen/get`).then(screen => {
            res.send(screen);
        }).catch(err => {
            res.send(err);
        });
    }

    public getScreenById(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.screenUrl}/screen/get/${req.params.id}`).then(screen => {
            res.send(screen);
        }).catch(err => {
            res.send(err);
        });
    }

    public updateScreen(req: Request, res: Response) {
        new ApiAdaptar().put(`${Constants.screenUrl}/screen/update/${req.params.id}`, req.body).then(screen => {
            res.send(screen);
        }).catch(err => {
            res.send(err);
        });
    }


    public deleteScreen(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.screenUrl}/screen/delete/${req.params.id}`).then(screen => {
            res.send(screen);
        }).catch(err => {
            res.send(err);
        });
    }

    public getAllScreenByProjectId(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.screenUrl}/screen/getbyprojectid/${req.params.projectId}`).then(screen => {
            res.send(screen);
        }).catch(err => {
            res.send(err);
        });
    }


    public getAllScreenByProjectAndFeatureId(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.screenUrl}/screen/getbyprojectandfeatureid/${req.params.projectId}/${req.params.featureId}`).then(screen => {
            res.send(screen);
        }).catch(err => {
            res.send(err);
        });
    }

    public getAllScreenByFeatureId(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.screenUrl}/screen/getbyfeatureid/${req.params.id}`).then(screen => {
            res.send(screen);
        }).catch(err => {
            res.send(err);
        });
    }

    public getTemplateByProjectId(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.screenUrl}/screen/template?projectId=${req.query.projectId}`).then(screen => {
            res.send(screen);
        }).catch(err => {
            res.send(err);
        });
    }
}
export { ScreenController };