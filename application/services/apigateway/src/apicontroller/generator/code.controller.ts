import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../../interfaces/controller.interface";
import { ApiAdaptar } from '../../config/apiAdaptar';
import * as Constants from '../../config/Constants';

export class CodeController implements Controller {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route('/generate/code').put(this.createProjectCode);
    }

    createProjectCode(req: Request, res: Response) {
        console.log('create project code ----- ', req.query.projectid)
        new ApiAdaptar().put(
            `${Constants.codeGenUrl}/generate/code?projectid=${req.query.projectid}`,
            req.body
        ).then((response) => {
            res.send(response);
        }).catch(err => {
            console.log('project code generation error ----  ', err);
            res.send(err);
        });
    }

}