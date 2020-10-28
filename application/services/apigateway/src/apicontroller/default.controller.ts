import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../interfaces/controller.interface";
import  {Constants} from '../config/Constants';
import { ApiAdaptar } from '../config/apiAdaptar';

export class DefaultController implements Controller {

    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route('/projects/default/create').get(this.createDefault);
    }

    private async createDefault(req: Request, res: Response) {
        try {
            const projectId = req.query.projectId;
            let result = await Promise.resolve(new ApiAdaptar().get(`${Constants.entityUrl}/projects/default/create/?projectId=${projectId}` + `&log_id=${req.query.log_id}`));
            console.log('create default entity success ----- ', result);
            res.send(result);
        } catch (err) {
            console.log('create default entity error ----  ', err);
            res.send(err);
        }
    }

}