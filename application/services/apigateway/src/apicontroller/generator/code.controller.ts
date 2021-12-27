import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../../interfaces/controller.interface";
import { ApiAdapter } from '../../config/apiAdapter';
import  {Constants} from '../../config/Constants';

export class CodeController implements Controller {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route('/generate/code').put(this.createProjectCode);
    }

    public async createProjectCode(req: Request, res: Response) {
        try {
            console.log('create project code ----- ', req.query.projectId)
            let response = await Promise.resolve(new ApiAdapter().put(
                `${Constants.codeGenUrl}/generate/code?projectId=${req.query.projectId}`, req.body));
            res.send(response);
        } catch (err) {
            console.log('project code generation error ----  ', err);
            res.send(err);
        }
    }

}