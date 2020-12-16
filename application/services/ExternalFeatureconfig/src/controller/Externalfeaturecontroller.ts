import { Request, Response, response } from 'express';
import { externalFeatureService } from '../service/Externalfeatureservice';
let externalfeature = new externalFeatureService();

export class externalFeatureController {

    constructor() { }

    public extfeaturectrl(req: Request, res: Response) {
        externalfeature.extrfeatureservice(req, (response,err) => {
            if(err){
                res.status(400)
                res.json(err);
            }
            res.status(200);
            res.json(response);
        })
    }

    public externalfeaturegetbyId(req:Request, res:Response){
        externalfeature.extrfeaturebyId(req,(response,err)=>{
            if(err){
                res.status(400)
                res.json(err);
            }
            res.status(200);
            res.json(response);
        })
    }

}