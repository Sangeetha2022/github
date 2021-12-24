import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../../interfaces/controller.interface";
import { ApiAdapter } from '../../config/apiAdapter';
import  {Constants} from '../../config/Constants';

export class PrivateGithubController implements Controller {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route('/github/private/deploy/project/:proj_id').post(this.pushProjectToPrivateRepo);

    }



    pushProjectToPrivateRepo(req: Request, res: Response) {
        new ApiAdapter().post(
            `${Constants.privateGithubUrl}/github/private/deploy/project/${req.params.proj_id}`,
            req.body
        ).then((response) => {
            console.log("req.body", req.body);
            res.send(response);
        }).catch(err => {
            res.send(err);
        });
    }
}