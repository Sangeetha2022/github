

import { Request, Response } from 'express';
import { WcmxService } from '../services/WcmxService';

let wcmxService = new WcmxService();

export class WcmxController {

    public wcmxAcoustic(req: Request, res: Response) {
        wcmxService.wcmxAcoustic(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}