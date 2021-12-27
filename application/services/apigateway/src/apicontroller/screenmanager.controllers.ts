
import * as express from "express";
import { Request, Response } from 'express';
import  {Constants} from '../config/Constants';
import { ApiAdapter } from '../config/apiAdapter';
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
        this.router.post('/projects/default/sefscreen', this.createSefScreen);

    }

    public async saveScreen(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdapter().post(`${Constants.screenUrl}/screen/save` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }


    public async getAllScreens(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdapter().get(`${Constants.screenUrl}/screen/get` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getScreenById(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdapter().get(`${Constants.screenUrl}/screen/get/${req.params.id}` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async updateScreen(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdapter().put(`${Constants.screenUrl}/screen/update/${req.params.id}` + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }


    public async deleteScreen(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdapter().delete(`${Constants.screenUrl}/screen/delete/${req.params.id}` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async deleteProjectScreen(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdapter().delete(`${Constants.screenUrl}/screen/deletebyproject/${req.params.id}` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }



    public async getAllScreenByProjectId(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdapter().get(`${Constants.screenUrl}/screen/getbyprojectid/${req.params.projectId}` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }


    public async getAllScreenByProjectAndFeatureId(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdapter().get(`${Constants.screenUrl}/screen/getbyprojectandfeatureid/${req.params.projectId}/${req.params.featureId}` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getAllScreenByFeatureId(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdapter().get(`${Constants.screenUrl}/screen/getbyfeatureid/${req.params.id}` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getTemplateByProjectId(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdapter().get(`${Constants.screenUrl}/screen/template?projectId=${req.query.projectId}` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async createDefaultScreen(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdapter().get(`${Constants.screenUrl}/projects/default/screen?projectId=${req.query.projectId}` + `&log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async createSefScreen(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdapter().post(
            `${Constants.screenUrl}/projects/default/sefscreen?projectId=${req.query.projectId}`
             + `&log_id=${req.query.log_id}` + `&featureId=${req.query.featureId}`, req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }
}
export { ScreenController };