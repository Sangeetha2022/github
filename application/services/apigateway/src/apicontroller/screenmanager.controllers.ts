
import * as express from "express";
import { Request, Response } from 'express';
import  {Constants} from '../config/Constants';
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
        this.router.delete('/screen/deletebyproject/:id', this.deleteProjectScreen);
        this.router.get('/screen/getbyprojectid/:projectId', this.getAllScreenByProjectId);
        this.router.get('/screen/getbyprojectandfeatureid/:projectId/:featureId', this.getAllScreenByProjectAndFeatureId);
        this.router.get('/screen/getbyfeatureid/:id', this.getAllScreenByFeatureId);
        this.router.get('/screen/template', this.getTemplateByProjectId);
        this.router.get('/projects/default/screen', this.createDefaultScreen);

    }

    public saveScreen(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.screenUrl}/screen/save`, req.body).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }


    public getAllScreens(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.screenUrl}/screen/get`).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public getScreenById(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.screenUrl}/screen/get/${req.params.id}`).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public updateScreen(req: Request, res: Response) {
        new ApiAdaptar().put(`${Constants.screenUrl}/screen/update/${req.params.id}`, req.body).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }


    public deleteScreen(req: Request, res: Response) {
        new ApiAdaptar().delete(`${Constants.screenUrl}/screen/delete/${req.params.id}`).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public deleteProjectScreen(req: Request, res: Response) {
        new ApiAdaptar().delete(`${Constants.screenUrl}/screen/deletebyproject/${req.params.id}`).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }



    public getAllScreenByProjectId(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.screenUrl}/screen/getbyprojectid/${req.params.projectId}`).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }


    public getAllScreenByProjectAndFeatureId(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.screenUrl}/screen/getbyprojectandfeatureid/${req.params.projectId}/${req.params.featureId}`).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public getAllScreenByFeatureId(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.screenUrl}/screen/getbyfeatureid/${req.params.id}`).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public getTemplateByProjectId(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.screenUrl}/screen/template?projectId=${req.query.projectId}`).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public createDefaultScreen(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.screenUrl}/projects/default/screen?projectId=${req.query.projectId}`).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }
}
export { ScreenController };