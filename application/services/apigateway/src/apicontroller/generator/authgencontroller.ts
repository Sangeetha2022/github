import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../../interfaces/controller.interface";
import { ApiAdapter } from '../../config/apiAdapter';
import  {Constants} from '../../config/Constants';


export class Authgencontroller implements Controller {

    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route('/auth').get(this.createLogin);
    }

    public async createLogin(req: Request, res: Response) {
        try {
           let response = await Promise.resolve(new ApiAdapter().get(
            `${Constants.authgenUrl}/auth?projectID=${req.query.projectID}&authPath=${req.query.authPath}&projectPath=${req.query.projectPath}&authTemplate=${req.query.authTemplate}&projectName=${req.query.projectName}`));
           res.send(response);
        } catch (err) {
            res.send(err);
        }
    }

}