
import { Request, Response } from 'express';
import { FrontendIonicService } from '../services/frontendIonicService';

let frontendIonicService = new FrontendIonicService();

export class FrontendIonicController {

    public generateIonicTemplate(req: Request, res: Response) {
        frontendIonicService.generateIonicTemplate(req, (response, status) => {
            if (status) {
                res.status(status);
            } else {
                res.status(200);
            }
            res.json(response);
        })
    }
}