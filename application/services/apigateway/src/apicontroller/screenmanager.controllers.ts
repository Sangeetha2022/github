
import * as express from "express";
import { Request, Response } from 'express';
import * as Constants from '../config/Constants';
import { ApiAdaptar } from '../config/apiAdaptar';
import Controller from '../interfaces/controller.interface';
import { EntityController } from './entity.controller';


const entityController = new EntityController();

class createUserTemplateController implements Controller {

    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/screen/save',this.userTemplateController);
        this.router.get('/screen/get', this.userTemplateController);
        
    }

    public userTemplateController(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.screenUrl }/screen/save`, req.body).then(user => {
            res.send(user);
        }).catch(err => {
            res.send(err);
        });
    }


    public userTemplateControll(req: Request, res: Response) {
        new ApiAdaptar().get(`${Constants.screenUrl}/screen/get`).then(user => {
            res.send(user);
        }).catch(err => {
            res.send(err);
        });
    }

   
}
export { createUserTemplateController };