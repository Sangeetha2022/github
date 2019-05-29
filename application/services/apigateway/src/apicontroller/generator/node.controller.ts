import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../../interfaces/controller.interface";
import { ApiAdaptar } from '../../config/apiAdaptar';
import * as Constants from '../../config/Constants';

export class NodeController implements Controller {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route('/node/project').post(this.createProjectNode);
    }

    createProjectNode(req: Request, res: Response) {
        new ApiAdaptar().post(
            `${Constants.nodeGenUrl}/node/project`,
            req.body
        ).then((response) => {
            res.send(response);
        }).catch(err => {
            res.send(err);
        });
    }

}