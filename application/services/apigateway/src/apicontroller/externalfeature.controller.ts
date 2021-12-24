import * as express from "express";
import { Request, Response } from 'express';
import {Constants} from '../config/Constants';
import { ApiAdapter } from '../config/apiAdapter';
import Controller from '../interfaces/controller.interface';


class ExternalfeatureController implements Controller {


    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {

        this.router.get('/externalfeature/get/:id', this.Externalfeature);

    }

    public async Externalfeature(req: Request, res: Response) {
        try {
            let result = await Promise.resolve(new ApiAdapter().get(`${Constants.externalfeature}/externalfeature/get/${req.params.id}` + `?log_id=${req.query.log_id}`));
            req.baseUrl === '/mobile' ? res.send(result) :
                req.baseUrl === '/desktop' ? res.send(result) : res.send(null);
        } catch (err) {
            req.baseUrl === '/mobile' ? res.send(err) :
                req.baseUrl === '/desktop' ? res.send(err) : res.send(null);
        }
    }

}

export { ExternalfeatureController };