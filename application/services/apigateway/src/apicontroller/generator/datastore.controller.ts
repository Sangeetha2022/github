import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../../interfaces/controller.interface";
import { ApiAdaptar } from '../../config/apiAdaptar';
import * as Constants from '../../config/Constants';

export class DataStoreController implements Controller {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route('/datastore/project').post(this.createProject);
    }

    createProject(req: Request, res: Response) {
        new ApiAdaptar().post(
            `${Constants.datastoreGenUrl}/datastore/project`,
            req.body
        ).then((response) => {
            res.send(response);
        }).catch(err => {
            res.send(err);
        });
    }

}