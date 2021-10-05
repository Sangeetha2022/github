import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../../interfaces/controller.interface";
import { ApiAdaptar } from '../../config/apiAdaptar';
import  {Constants} from '../../config/Constants';

export class AngularTemplateControllerV12 implements Controller {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route('/template/angular').post(this.createAngularTemplate);
    }

    public async createAngularTemplate(req: Request, res: Response) {
        try {
            console.log('create angular template v12 in apigateway -----  ');
            let response = await Promise.resolve(new ApiAdaptar().post(
                `${Constants.angularTemplateGenUrlV12}/template/angular`, req.body));
            res.send(response);
        } catch (err) {
            res.send(err);
        }
    }
}