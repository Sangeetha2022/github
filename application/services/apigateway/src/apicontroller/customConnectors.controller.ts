import * as express from 'express';
import {Request, Response} from 'express'
import  {Constants} from '../config/Constants';
import {ApiAdapter} from '../config/apiAdapter'
import Controller from '../interfaces/controller.interface';

 export class customConnectors implements Controller {
    public router = express.Router();
    
    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes(){
        this.router.route('/quick/test').post(this.quickTestcustomConnectors)
    }


    public async quickTestcustomConnectors(req:Request , res: Response){
        try {
            let response = await Promise.resolve(new ApiAdapter().post(`${Constants.customConnectorUrl}/quick/test` + `?log_id=${req.query.log_id}`, req.body));
            res.send(response);
        } catch (err) {
            res.send(err);
        }
    }
}