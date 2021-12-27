import * as express from 'express';
import { Request, Response } from 'express';
import Controller from '../interfaces/controller.interface';
import  {Constants} from '../config/Constants';
import { ApiAdapter } from '../config/apiAdapter';

export class Proxycontroller implements Controller {

    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {

        this.router.route('/proxy').post(this.Proxy);
    }

    public async Proxy(req: Request, res: Response) {
        try {
            console.log('-------requestbody-------', req.body);
            let response = await Promise.resolve(new ApiAdapter().post(`${Constants.proxyUrl}/proxy`, req.body));
            res.send(response);
        } catch (err) {
            res.send(err);
        }
    }


}