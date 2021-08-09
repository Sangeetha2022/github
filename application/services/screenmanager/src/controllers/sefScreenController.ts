import { Request, Response } from 'express';
import { SefScreenService } from '../services/SefScreenService';

let sefscreenservice = new SefScreenService();
export class SefScreenController {

    public createSefScreen(req: Request, res:Response){
        sefscreenservice.createSefScreen(req,(response)=>{
            res.status(200);
            res.send(response);
        })
    }
}