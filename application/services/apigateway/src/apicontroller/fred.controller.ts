import * as express from 'express';
import {Request, Response} from 'express'
import * as Constants from '../config/Constants';
import {ApiAdaptar} from '../config/apiAdaptar'
import Controller from '../interfaces/controller.interface';

 export class FredController implements Controller {
    public router = express.Router();
    
    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes(){
        this.router.route('/fred').post(this.getFred);
        this.router.route('/quick/test').post(this.quickTest)

    }

    public getFred(req:Request , res: Response){
        new ApiAdaptar().post(`${Constants.fredUrl}/fred`, req.body).then((response) => {
            res.send(response);
        }).catch(err => {
            res.send(err);
        })

    }
    public quickTest(req:Request , res: Response){
        new ApiAdaptar().post(`${Constants.fredUrl}/quick/test`, req.body).then((response) => {
            res.send(response);
        }).catch(err => {
            res.send(err);
        })

    }
}