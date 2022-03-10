import { Request, Response } from 'express';
import { gfcService } from '../service/gfcService';
import { CustomLogger } from '../config/Logger'
let gepfeatureconfig = new gfcService();

export class gfcController {

    constructor() { }

    public createGepFeatures(req: Request, res: Response) {
        gepfeatureconfig.createGepFeatures(req, (response) => {
            new CustomLogger().showLogger('info', 'Enter into gfcController.ts: GpCreate');
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from gfcController.ts: GpCreate');
        })
    }
    


}