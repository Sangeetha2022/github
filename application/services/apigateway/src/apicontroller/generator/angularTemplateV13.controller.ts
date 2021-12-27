import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../../interfaces/controller.interface";
import { ApiAdapter } from '../../config/apiAdapter';
import  {Constants} from '../../config/Constants';

export class AngularTemplateControllerV13 implements Controller {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route('/template/angularv13').post(this.createAngularTemplate);
    }

    public async createAngularTemplate(req: Request, res: Response) {
        try {
            console.log('create angular template v13 in apigateway -----  ');
            let response = await Promise.resolve(new ApiAdapter().post(
                `${Constants.angularTemplateGenUrlV13}/template/angularv13`, req.body));
            res.send(response);
        } catch (err) {
            res.send(err);
        }
    }
}