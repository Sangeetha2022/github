import { Request, Response } from 'express';
import { gfcService } from '../service/gfcService';
import { gfcClient } from '../service/gfcClient';
import { CustomLogger } from '../config/Logger'
let gepfeatureconfigService = new gfcService();
let gepfeatureconfigClient = new gfcClient();

export class gfcController {

    constructor() { }

    public createGepFeaturesClient(req: Request, res: Response) {
        gepfeatureconfigClient.createGepFeaturesClient(req, (response) => {
            new CustomLogger().showLogger('info', 'Enter into gfcController.ts: GpCreate');
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from gfcController.ts: GpCreate');
        })
    }
    
    public createGepFeaturesServices(req: Request, res: Response) {
        gepfeatureconfigService.createGepFeaturesServices(req, (response) => {
            new CustomLogger().showLogger('info', 'Enter into gfcController.ts: GpCreate');
            res.status(200);
            res.json(response);
            new CustomLogger().showLogger('info', 'Exit from gfcController.ts: GpCreate');
        })
    }


}