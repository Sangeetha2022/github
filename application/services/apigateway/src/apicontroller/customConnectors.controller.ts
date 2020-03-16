import * as express from 'express';
import {Request, Response} from 'express'
import  {Constants} from '../config/Constants';
import {ApiAdaptar} from '../config/apiAdaptar'
import Controller from '../interfaces/controller.interface';

 export class customConnectors implements Controller {
    public router = express.Router();
    
    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes(){
        this.router.route('/quick/test').post(this.quickTestcustomConnectors)
    }


    public quickTestcustomConnectors(req:Request , res: Response){
        new ApiAdaptar().post(`${Constants.customConnectorUrl}/quick/test`, req.body).then((response) => {
            res.send(response);
        }).catch(err => {
            res.send(err);
        })

    }
}