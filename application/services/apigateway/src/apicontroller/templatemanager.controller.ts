
import * as express from "express";
import { Request, Response } from 'express';
import { Constants } from '../config/Constants';
import { ApiAdaptar } from '../config/apiAdaptar';
import Controller from '../interfaces/controller.interface';


export class TemplateController implements Controller {

    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/template/save', this.addTemplate);
        this.router.post('/project/template/save', this.addProjectTemplate);
        this.router.get('/project/template/:projectid', this.getProjectTemplate);
        this.router.get('/template/get/project/:projectid', this.getAllTemplateByProject);
        this.router.get('/template/get/:id', this.getTemplateByID);
        this.router.get('/project/template/get/:id', this.getProjectTemplateByID);
        this.router.get('/template/getall', this.getAllTemplates);
        this.router.put('/template/update/:id', this.updateTemplate);
        this.router.post('/project/template/update/:id', this.updateProjectTemplate);
        this.router.delete('/template/delete/:id', this.deleteTemplate);
        this.router.get('/template/gettemplatename',this.getTemplateByName);
        this.router.get('/templateparser/get', this.getTemplateParser);
        this.router.delete('/project/template/delete/:id', this.deleteProjectTemplate);
    }

    public async addTemplate(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().post(Constants.templateUrl + '/template/save' + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async addProjectTemplate(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().post(Constants.templateUrl + '/project/template/save' + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public getProjectTemplate = async (req: Request, res: Response) => {
        try {
            let result = await Promise.resolve(new ApiAdaptar().get(Constants.templateUrl + '/project/template/' + req.params.projectid + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async updateTemplate(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().put(Constants.templateUrl + '/template/update/' + req.params.id + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async updateProjectTemplate(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().post(Constants.templateUrl + '/project/template/update/' + req.params.id + `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async deleteTemplate(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().delete(Constants.templateUrl + '/template/delete/' + req.params.id + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getAllTemplates(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().get(Constants.templateUrl + '/template/getall' + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }


    public getTemplateByName = async (req:Request, res: Response) => {
        try {
            // console.log('----------------kishan-----------',req);
            let result = await Promise.resolve(new ApiAdaptar().get(Constants.templateUrl + '/template/gettemplatename?template_name='+ req.query.template_name + `&log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }


    public getTemplateByID = async (req: Request, res: Response) => {
        try {
            let result = await Promise.resolve(new ApiAdaptar().get(Constants.templateUrl + '/template/get/' + req.params.id + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public getProjectTemplateByID = async (req: Request, res: Response) => {
        try {
            let result = await Promise.resolve(new ApiAdaptar().get(Constants.templateUrl + '/project/template/get/' + req.params.id + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public getAllTemplateByProject = async (req: Request, res: Response) => {
        try {
            let result = await Promise.resolve(new ApiAdaptar().get(Constants.templateUrl + '/template/get/project/' + req.params.projectid + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public getTemplateParser = async (req: Request, res: Response) => {
        try {
            let result = await Promise.resolve(new ApiAdaptar().get(Constants.templateUrl + '/templateparser/get' + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async deleteProjectTemplate(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().delete(Constants.templateUrl + '/project/template/delete/' + req.params.id + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

}

