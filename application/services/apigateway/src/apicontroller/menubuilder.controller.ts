
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
    }

    public addMenu(req: Request, res: Response) {
        new ApiAdaptar().post(Constants.menuUrl + '/menu/save', req.body).then(proj => {
            res.send(proj);
        }).catch(err => {
            res.send(err);
        });
    }

    public updateMenu(req: Request, res: Response) {
        new ApiAdaptar().put(Constants.menuUrl + '/menu/update/' + req.params.id, req.body).then(proj => {
            res.send(proj);
        }).catch(err => {
            res.send(err);
        });
    }

    public deleteMenu(req: Request, res: Response) {
        new ApiAdaptar().delete(Constants.menuUrl + '/menu/delete/' + req.params.id).then(proj => {
            res.send(proj);
        }).catch(err => {
            res.send(err);
        });
    }

    public getAllMenu(req: Request, res: Response) {
        new ApiAdaptar().get(Constants.menuUrl + '/menu/getall').then(allproject => {
            res.send(allproject);
        }).catch(err => {
            res.send(err);
        });
    }

    public getMenuById = (req: Request, res: Response) => {
        new ApiAdaptar().get(Constants.menuUrl + '/menu/getbyid/' + req.params.id).then(proj => {
            res.send(proj);
            // req.baseUrl === '/mobile' ? res.send(proj) :
            //     req.baseUrl === '/desktop' ? res.send(proj) : res.send(null)
        }).catch(err => {
            res.send(err);
        });
    }

    public getMenuByProjectId = (req: Request, res: Response) => {
        new ApiAdaptar().get(Constants.menuUrl + '/menu/getbyprojectid/' + req.params.projectId).then(proj => {
            res.send(proj);
            // req.baseUrl === '/mobile' ? res.send(proj) :
            //     req.baseUrl === '/desktop' ? res.send(proj) : res.send(null)
        }).catch(err => {
            res.send(err);
        });
    }

    public updateMenuByProjectId(req: Request, res: Response) {
        new ApiAdaptar().put(Constants.menuUrl + '/menu/updatemenubyproject/' + req.params.projectId, req.body).then(proj => {
            res.send(proj);
        }).catch(err => {
            res.send(err);
        });
    }

}

export { MenubuilderController };
