import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../../interfaces/controller.interface";
import { ApiAdaptar } from '../../config/apiAdaptar';
import  {Constants} from '../../config/Constants';

export class AngularTemplateController implements Controller {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route('/template/angular').post(this.createAngularTemplate);
    }

    public async createAngularTemplate(req: Request, res: Response) {
        try {
            console.log('create angular template in apigateway -----  ');
            let response = await Promise.resolve(new ApiAdaptar().post(
                `${Constants.angularTemplateGenUrl}/template/angular`, req.body));
            res.send(response);
        } catch (err) {
            res.send(err);
        }
    }
}