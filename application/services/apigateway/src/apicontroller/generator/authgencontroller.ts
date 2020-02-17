import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../../interfaces/controller.interface";
import { ApiAdaptar } from '../../config/apiAdaptar';
import  {Constants} from '../../config/Constants';


export class Authgencontroller implements Controller {

    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route('/auth').get(this.createLogin);
    }

    createLogin(req: Request, res: Response) {
        new ApiAdaptar().get(
            `${Constants.authgenUrl}/auth?projectID=${req.query.projectID}&authPath=${req.query.authPath}&projectPath=${req.query.projectPath}&authTemplate=${req.query.authTemplate}&projectName=${req.query.projectName}`).then((response) => {
            res.send(response);
        }).catch(err => {
            console.log('Auth generation error ----  ', err);
            res.send(err);
        });
    }

}