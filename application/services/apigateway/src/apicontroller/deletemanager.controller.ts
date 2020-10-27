
import * as express from "express";
import { Request, Response } from 'express';
import  {Constants} from '../config/Constants';
import { ApiAdaptar } from '../config/apiAdaptar';
import Controller from '../interfaces/controller.interface';



class DeleteManagerController implements Controller {

    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.delete('/delete/project/:id', this.deleteProject);
        this.router.delete('/delete/entity/:id', this.deleteEntity);
        this.router.delete('/delete/feature/:id', this.deleteFeature);
        this.router.delete('/delete/menu/:id', this.deleteMenu);
        this.router.delete('/delete/screen/:id', this.deleteScreen);
        this.router.delete('/delete/flow/:id', this.deleteFlow);

    }


    public async deleteProject(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().delete(Constants.deleteUrl + '/delete/project/' + req.params.id + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async deleteEntity(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().delete(Constants.deleteUrl + '/delete/entity/' + req.params.id + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async deleteFeature(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().delete(Constants.deleteUrl + '/delete/feature/' + req.params.id + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async deleteMenu(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().delete(Constants.deleteUrl + '/delete/menu/' + req.params.id + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async deleteScreen(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().delete(Constants.deleteUrl + '/delete/screen/' + req.params.id + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch(err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async deleteFlow(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().delete(Constants.deleteUrl + '/delete/flow/' + req.params.id + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

}

export { DeleteManagerController };
