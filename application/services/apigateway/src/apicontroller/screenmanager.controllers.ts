
import * as express from "express";
import { Request, Response } from 'express';
import * as Constants from '../config/Constants';
import { ApiAdaptar } from '../config/apiAdaptar';
import Controller from '../interfaces/controller.interface';


class ScreenController implements Controller {

    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/screen/save', this.userTemplateController);
        this.router.get('/screen/get', this.userTemplateController);
        this.router.get('/screen/getbyprojectid/:projectId', this.getScreenByProject);


    }

    public userTemplateController(req: Request, res: Response) {
        new ApiAdaptar().post(`${Constants.screenUrl}/screen/save`, req.body).then(user => {
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


    public getScreenByProject = (req: Request, res: Response) => {
        new ApiAdaptar().get(Constants.screenUrl + '/screen/getbyprojectid/' + req.params.projectId).then(proj => {
            console.log('reponse in main method')
            res.send(proj);
        }).catch(err => {
            res.send(err);
        });
    }

}
export { ScreenController };