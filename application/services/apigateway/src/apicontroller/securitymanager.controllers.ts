import * as express from "express";
import { Request, Response } from 'express';
import * as Constants from '../config/Constants';
import { ApiAdaptar } from '../config/apiAdaptar';
import Controller from '../interfaces/controller.interface';
import { EntityController } from './entity.controller';


const entityController = new EntityController();

class securityController implements Controller {

    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {

        this.router.post('/signup', this.signincontroller);
        this.router.post('/login',this.logincontroller);
        this.router.post('/consent',this.consentcontroller);
        this.router.post('/logout',this.logoutcontroller);
        
       
       
    }

    public signincontroller(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.securityUrl}/signup`, req.body).then(security => {
            res.send(security);
        }).catch(err => {
            res.send(err);
        });
    }

    public logincontroller(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.securityUrl}/login`, req.body).then(security => {
            res.send(security);
        }).catch(err => {
            res.send(err);
        });
    }

    public consentcontroller(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.securityUrl}/consent`, req.body).then(security => {
            res.send(security);
        }).catch(err => {
            res.send(err);
        });
    }

    public logoutcontroller(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.securityUrl}/logout`, req.body).then(security => {
            res.send(security);
        }).catch(err => {
            res.send(err);
        });
    }



}
export { securityController };
