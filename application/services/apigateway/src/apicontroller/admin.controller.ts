
import * as express from "express";
import { Request, Response } from 'express';
import {Constants} from '../config/Constants';
import { ApiAdapter } from '../config/apiAdapter';
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

    public async adminUser(req: Request, res: Response) {
        try{
            let result = await Promise.resolve(new ApiAdapter().get(`${Constants.adminUrl}/admin/getusers` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err){
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }


    public async getUser(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdapter().get(`${Constants.adminUrl}/admin/getuser/:id` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }


    public async getRoles(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdapter().get(`${Constants.adminUrl}/admin/getallroles` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        }catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

    public async updateUser(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdapter().put(`${Constants.adminUrl}/admin/updateuser`+ `?log_id=${req.query.log_id}`, req.body));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

}
export { AdminController };
