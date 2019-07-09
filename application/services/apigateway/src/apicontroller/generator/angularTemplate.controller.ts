import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../../interfaces/controller.interface";
import { ApiAdaptar } from '../../config/apiAdaptar';
import * as Constants from '../../config/Constants';

export class AngularTemplateController implements Controller {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route('/template/angular').post(this.createAngularTemplate);
    }

    createAngularTemplate(req: Request, res: Response) {
        console.log('create angular template in apigateway -----  ');
        new ApiAdaptar().post(
            `${Constants.angularTemplateGenUrl}/template/angular`,
            req.body
        ).then((response) => {
            res.send(response);
        }).catch(err => {
            res.send(err);
        });
    }
}