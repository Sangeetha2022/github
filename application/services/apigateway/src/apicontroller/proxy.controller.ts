import * as express from 'express';
import { Request, Response } from 'express';
import Controller from '../interfaces/controller.interface';
import  {Constants} from '../config/Constants';
import { ApiAdaptar } from '../config/apiAdaptar';

export class Proxycontroller implements Controller {

    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {

        this.router.route('/proxy').post(this.Proxy);
    }

    public Proxy(req: Request, res: Response) {
        console.log('-------requestbody-------', req.body);
        new ApiAdaptar().post(`${Constants.proxyUrl}/proxy`, req.body).then((response) => {
            res.send(response);
        }).catch(err => {
            res.send(err);
        })
    }


}