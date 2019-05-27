import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../../interfaces/controller.interface";
import { ApiAdaptar } from '../../config/apiAdaptar';
import * as Constants from '../../config/Constants';

export class BackendController implements Controller {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route('/backend/project').post(this.createProject);
    }

    createProject(req: Request, res: Response) {
        new ApiAdaptar().post(
            `${Constants.backendGenUrl}/backend/project`,
            req.body
        ).then((response) => {
            res.send(response);
        }).catch(err => {
            console.log('project code generation error ----  ', err);
            res.send(err);
        });
    }

}