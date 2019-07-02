import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../../interfaces/controller.interface";
import { ApiAdaptar } from '../../config/apiAdaptar';
import * as Constants from '../../config/Constants';

export class GithubController implements Controller {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route('/github/deploy/project/:proj_id').post(this.pushProject);
    }

    pushProject(req: Request, res: Response) {
        new ApiAdaptar().post(
            `${Constants.githubUrl}/github/deploy/project/${req.params.proj_id}`,
            req.body
        ).then((response) => {
            console.log("req.body", req.body);
            console.log('create github response are ------>', response);
            res.send(response);
        }).catch(err => {
            res.send(err);
        });
    }
}