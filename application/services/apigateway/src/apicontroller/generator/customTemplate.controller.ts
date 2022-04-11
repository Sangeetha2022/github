import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../../interfaces/controller.interface";
import { ApiAdapter } from '../../config/apiAdapter';
import  {Constants} from '../../config/Constants';

export class CustomTemplateController implements Controller {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route('/template/customtemplatev13').post(this.createCustomTemplate);
    }

    public async createCustomTemplate(req: Request, res: Response) {
        try {
            console.log('create custom template v13 in apigateway -----  ');
            let response = await Promise.resolve(new ApiAdapter().post(
                `${Constants.customTemplateGenUrl}/template/customtemplatev13`, req.body));
            res.send(response);
        } catch (err) {
            res.send(err);
        }
    }
}