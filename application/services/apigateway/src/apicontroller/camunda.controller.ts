import * as express from 'express';
import { Request, Response } from 'express';
import Controller from '../interfaces/controller.interface';
import  {Constants} from '../config/Constants';
import { ApiAdaptar } from '../config/apiAdaptar';

export class Camundacontroller implements Controller {

    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {

        this.router.route('/accesslevel').post(this.Camunda);
    }

    public async Camunda(req: Request, res: Response) {
        try {
            let response = await Promise.resolve(new ApiAdaptar().post(`${Constants.camundaUrl}/accesslevel`, req.body));
            res.send(response);
        } catch (err) {
            res.send(err);
        }
    }


}