
import * as express from "express";
import { Request, Response } from 'express';
import  {Constants} from '../config/Constants';
import { ApiAdaptar } from '../config/apiAdaptar';
import Controller from '../interfaces/controller.interface';

class MenubuilderController implements Controller {

    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {

        this.router.post('/menu/save', this.addMenu);
        this.router.get('/menu/getall', this.getAllMenu);
        this.router.get('/menu/getbyid/:id', this.getMenuById);
        this.router.put('/menu/update/:id', this.updateMenu);
        this.router.delete('/menu/delete/:id', this.deleteMenu)
        this.router.get('/menu/getbyprojectid/:projectId', this.getMenuByProjectId);
        this.router.put('/menu/updatemenubyproject/:projectId', this.updateMenuByProjectId);
        this.router.get('/menu/default', this.addDefaultMenu);
        this.router.delete('/menu/deletebyproject/:id', this.deleteProjectMenu)
    }

    public async addMenu(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().post(Constants.menuUrl + '/menu/save', req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async updateMenu(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().put(Constants.menuUrl + '/menu/update/' + req.params.id, req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async deleteMenu(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().delete(Constants.menuUrl + '/menu/delete/' + req.params.id));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async deleteProjectMenu(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().delete(Constants.menuUrl + '/menu/deletebyproject/' + req.params.id));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async getAllMenu(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().get(Constants.menuUrl + '/menu/getall'));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public getMenuById = async (req: Request, res: Response) => {
        try {
            let result = await Promise.resolve(new ApiAdaptar().get(Constants.menuUrl + '/menu/getbyid/' + req.params.id));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public getMenuByProjectId = async (req: Request, res: Response) => {
        try {
            let result = await Promise.resolve(new ApiAdaptar().get(Constants.menuUrl + '/menu/getbyprojectid/' + req.params.projectId));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async updateMenuByProjectId(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdaptar().put(Constants.menuUrl + '/menu/updatemenubyproject/' + req.params.projectId, req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public addDefaultMenu = async (req: Request, res: Response) => {
        try {
            let result = await Promise.resolve(new ApiAdaptar().get(Constants.menuUrl + `/menu/default/?projectId=${req.query.projectId}&primaryLanguage=${req.query.primaryLanguage}&secondaryLanguage=${req.query.secondaryLanguage}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }


}

export { MenubuilderController };
