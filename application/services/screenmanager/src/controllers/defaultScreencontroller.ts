import { Request, Response } from 'express';
import { DefaultScreenservice } from '../services/defaultScreenservice';

let defaultscreenservice = new DefaultScreenservice();
export class DefaultScreencontroller {

    public createdefaultscreen(req: Request, res:Response){
        defaultscreenservice.createdefaultscreen(req,(response)=>{
            res.status(200);
            res.send(response);
        })
    }
}