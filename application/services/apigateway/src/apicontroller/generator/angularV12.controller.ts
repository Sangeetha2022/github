import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../../interfaces/controller.interface";
import { ApiAdaptar } from '../../config/apiAdaptar';
import { Constants } from '../../config/Constants';

export class AngularControllerV12 implements Controller {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route('/angularv12/project').post(this.createProject);
    }

    public async createProject(req: Request, res: Response) {
        try {
            let response = await Promise.resolve(new ApiAdaptar().post(
                `${Constants.angularGenUrlV12}/angularv12/project`, req.body));
            res.send(response);
        } catch (err) {
            res.send(err);
        }
    }
}