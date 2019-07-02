
import { Request, Response } from 'mongoose';
import { FrontendService } from '../services/frontendService';

let frontendService = new FrontendService();

export class FrontendController {

    public createProject(req: Request, res: Response) {
        frontendService.createProject(req, (response, status) => {
            if (status) {
                res.status(status);
            } else {
                res.status(200);
            }
            res.json(response);
        })
    }
}