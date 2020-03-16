
import * as express from "express";
import { Request, Response } from 'express';
import {Constants} from '../config/Constants';
import { ApiAdaptar } from '../config/apiAdaptar';
import Controller from '../interfaces/controller.interface';

class AdminController implements Controller {

    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {

        this.router.get('/admin/getusers', this.adminUser);
        this.router.get('/admin/getuser/:id', this.getUser);
        this.router.get('/admin/getallroles', this.getRoles);
        this.router.put('/admin/updateuser', this.updateUser);

    }

    public adminUser(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.adminUrl}/admin/getusers`).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public getUser(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.adminUrl}/admin/getuser/:id`).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public getRoles(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.adminUrl}/admin/getallroles`).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

    public updateUser(req: Request, res: Response) {
        new ApiAdaptar().put(`${Constants.adminUrl}/admin/updateuser`, req.body).then(result => {
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }).catch(err => {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        });
    }

}
export { AdminController };
