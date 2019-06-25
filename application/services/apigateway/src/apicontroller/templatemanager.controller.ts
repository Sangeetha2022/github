
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

    }

    public addTemplate(req: Request, res: Response) {
        console.log('entering into add project api gateway')
        new ApiAdaptar().post(Constants.templateUrl + '/template/save', req.body).then(proj => {
            res.send(proj);
        }).catch(err => {
            res.send(err);
        });
    }

    public updateTemplate(req: Request, res: Response) {
        new ApiAdaptar().put(Constants.templateUrl + '/template/update/' + req.params.id, req.body).then(proj => {
            res.send(proj);
        }).catch(err => {
            res.send(err);
        });
    }

    public deleteTemplate(req: Request, res: Response) {
        new ApiAdaptar().delete(Constants.templateUrl + '/template/delete/' + req.params.id).then(proj => {
            res.send(proj);
        }).catch(err => {
            res.send(err);
        });
    }

    public getAllTemplates(req: Request, res: Response) {
        new ApiAdaptar().get(Constants.templateUrl + '/template/getall').then(allproject => {
            res.send(allproject);
        }).catch(err => {
            res.send(err);
        });
    }

    public getTemplateByID = (req: Request, res: Response) => {
        console.log('entering into method')
        new ApiAdaptar().get(Constants.templateUrl + '/template/get/' + req.params.id).then(proj => {
            console.log('reponse in main method')
            res.send(proj);
        }).catch(err => {
            res.send(err);
        });
    }

    public getAllTemplateByProject = (req: Request, res: Response) => {
        console.log('entering into method')
        new ApiAdaptar().get(Constants.templateUrl + '/template/get/project/' + req.params.projectid).then(proj => {
            console.log('reponse in main method')
            res.send(proj);
        }).catch(err => {
            res.send(err);
        });
    }

}

export { TemplateController };
