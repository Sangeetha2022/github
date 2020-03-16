import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../../interfaces/controller.interface";
import { ApiAdaptar } from '../../config/apiAdaptar';
import  {Constants} from '../../config/Constants';

export class AngularController implements Controller {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route('/angular/project').post(this.createProject);
    }

    createProject(req: Request, res: Response) {
        new ApiAdaptar().post(
            `${Constants.angularGenUrl}/angular/project`,
            req.body
        ).then((response) => {
            res.send(response);
        }).catch(err => {
            res.send(err);
        });
    }
}