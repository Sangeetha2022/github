
import { Request, Response } from 'mongoose';
import { BackendService } from '../services/backendService';

let backendService = new BackendService();

export class BackendController {

    public createbackend(req: Request, res: Response) {
        backendService.createbackend(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}