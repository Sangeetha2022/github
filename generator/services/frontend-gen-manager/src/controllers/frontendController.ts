
import { Request, Response } from 'mongoose';
import { FrontendService } from '../services/frontendService';

let frontendService = new FrontendService();

export class FrontendController {

    public frontendProject(req: Request, res: Response) {
        frontendService.frontendProject(req, (response, status) => {
            if (status) {
                res.status(status);
            } else {
                res.status(200);
            }
            res.json(response);
        })
    }
}