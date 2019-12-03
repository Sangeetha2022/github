
import * as express from "express";
import { Request, Response } from 'express';
import * as Constants from '../config/Constants';
import { ApiAdaptar } from '../config/apiAdaptar';
import Controller from '../interfaces/controller.interface';


class TemplateController implements Controller {

    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/template/save', this.addTemplate);
        this.router.get('/template/get/project/:projectid', this.getAllTemplateByProject)
        this.router.get('/template/get/:id', this.getTemplateByID)
        this.router.get('/template/getall', this.getAllTemplates)
        this.router.put('/template/update/:id', this.updateTemplate)
        this.router.delete('/template/delete/:id', this.deleteTemplate)
        this.router.get('/templateparser/get', this.getTemplateParser)
    }

    public addTemplate(req: Request, res: Response) {
        new ApiAdaptar().post(Constants.templateUrl + '/template/save', req.body).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public updateTemplate(req: Request, res: Response) {
        new ApiAdaptar().put(Constants.templateUrl + '/template/update/' + req.params.id, req.body).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public deleteTemplate(req: Request, res: Response) {
        new ApiAdaptar().delete(Constants.templateUrl + '/template/delete/' + req.params.id).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public getAllTemplates(req: Request, res: Response) {
        new ApiAdaptar().get(Constants.templateUrl + '/template/getall').then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public getTemplateByID = (req: Request, res: Response) => {
        new ApiAdaptar().get(Constants.templateUrl + '/template/get/' + req.params.id).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public getAllTemplateByProject = (req: Request, res: Response) => {
        new ApiAdaptar().get(Constants.templateUrl + '/template/get/project/' + req.params.projectid).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public getTemplateParser = (req: Request, res: Response) => {
        new ApiAdaptar().get(Constants.templateUrl + '/templateparser/get').then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

}

export { TemplateController };
