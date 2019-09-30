import { FredService } from '../services/fredService'
import { Request, Response } from 'express';

let fredService: FredService = new FredService();

export class FredController {


    public getFred(req: Request, res: Response) {
        console.log('reeqwe12344--->>>', req.body);
      
        fredService.getFred(req, (response) => {
            res.status(200);
            res.json(response)
        })
    }

    public quickTest(req: Request , res: Response) {
        fredService.quickTest(req , (response) => {
            res.status(200);
            res.json(response)
        })

    }
}