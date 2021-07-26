import { Request, Response } from 'express';
import { DefaultFeatureService } from '../services/DefaultFeatureService';

let defaultFeatureService = new DefaultFeatureService();

export class DefaultFeatureController {


    public saveDefaultFeature(req: Request, res: Response) {
        defaultFeatureService.saveDefaultFeature(req, (user) => {
            res.status(200);
            res.json(user);
        })
    }

    
}