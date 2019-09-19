
import * as express from "express";
import { Request, Response } from 'express';
import * as Constants from '../config/Constants';
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

    public addMenu(req: Request, res: Response) {
        new ApiAdaptar().post(Constants.menuUrl + '/menu/save', req.body).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public updateMenu(req: Request, res: Response) {
        new ApiAdaptar().put(Constants.menuUrl + '/menu/update/' + req.params.id, req.body).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public deleteMenu(req: Request, res: Response) {
        new ApiAdaptar().delete(Constants.menuUrl + '/menu/delete/' + req.params.id).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public deleteProjectMenu(req: Request, res: Response) {
        new ApiAdaptar().delete(Constants.menuUrl + '/menu/deletebyproject/' + req.params.id).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public getAllMenu(req: Request, res: Response) {
        new ApiAdaptar().get(Constants.menuUrl + '/menu/getall').then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public getMenuById = (req: Request, res: Response) => {
        new ApiAdaptar().get(Constants.menuUrl + '/menu/getbyid/' + req.params.id).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public getMenuByProjectId = (req: Request, res: Response) => {
        new ApiAdaptar().get(Constants.menuUrl + '/menu/getbyprojectid/' + req.params.projectId).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public updateMenuByProjectId(req: Request, res: Response) {
        new ApiAdaptar().put(Constants.menuUrl + '/menu/updatemenubyproject/' + req.params.projectId, req.body).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public addDefaultMenu = (req: Request, res: Response) => {
        new ApiAdaptar().get(Constants.menuUrl + `/menu/default/?projectId=${req.query.projectId}&primaryLanguage=${req.query.primaryLanguage}&secondaryLanguage=${req.query.secondaryLanguage}`).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }


}

export { MenubuilderController };
