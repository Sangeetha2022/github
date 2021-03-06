import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../../interfaces/controller.interface";
import { ApiAdapter } from '../../config/apiAdapter';
import { Constants } from '../../config/Constants';

export class AngularControllerV13 implements Controller {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route('/angularv13/project').post(this.createProject);
    }

    public async createProject(req: Request, res: Response) {
        try {
            let response = await Promise.resolve(new ApiAdapter().post(
                `${Constants.angularGenUrlV13}/angularv13/project`, req.body));
            res.send(response);
        } catch (err) {
            res.send(err);
        }
    }
}