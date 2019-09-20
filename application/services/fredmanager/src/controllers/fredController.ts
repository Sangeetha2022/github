import { FredService } from '../services/fredService'
import { Request, Response } from 'express';

let fredService: FredService = new FredService();

export class FredController {


    public getFred(req: Request, res: Response) {
        console.log('reeqwe12344--->>>', req.body);
        let data = {
            projectId: req.body.projectId,
            featureId: req.body.feature_id,
            endPointUrl: req.body.endPointUrl,
            params:req.body.params,
            api_key: req.body.api_key,
        };
        fredService.getFred(data, (response) => {
            res.status(200);
            res.json(response)
        })
    }
}