import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../../interfaces/controller.interface";
import { ApiAdaptar } from '../../config/apiAdaptar';
import * as Constants from '../../config/Constants';

export class GenerationController implements Controller {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route('/projectgen/project/:id/get').get(this.createProject);
    }

    createProject(req: Request, res: Response) {
        new ApiAdaptar().get(
            `${Constants.projectGenUrl}/projectgen/project/${req.params.id}/get`,
        ).then((response) => {
            res.send(response);
        }).catch(err => {
            res.send(err);
        });
    }

}