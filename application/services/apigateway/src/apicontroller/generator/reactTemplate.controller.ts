import * as express from 'express';
import { Request, Response } from 'express';
import Controller from "../../interfaces/controller.interface";
import { ApiAdaptar } from '../../config/apiAdaptar';
import  {Constants} from '../../config/Constants';

export class ReactTemplateController implements Controller {
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.route('/template/react').post(this.createReactTemplate);
    }

    public async createReactTemplate(req: Request, res: Response) {
        try {
            console.log('create react template in apigateway -----  ');
            let response = await Promise.resolve(new ApiAdaptar().post(
                `${Constants.reactTemplateGenUrl}/template/react`, req.body));
            res.send(response);
        } catch (err) {
            res.send(err);
        }
    }
}