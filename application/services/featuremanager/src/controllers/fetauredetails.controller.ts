import { Request, Response } from 'express';
import { FeatureDetailsService } from '../services/fetauredetails.service';

let featureDetailsService = new FeatureDetailsService()

export class FeatureDetailsController {

    uploadeFeaturefile = async(req: Request, res: Response) => {
        featureDetailsService.uploadeFeaturefile(req, (user) => {
            res.status(200);
            res.json(user);
        })
    }

}