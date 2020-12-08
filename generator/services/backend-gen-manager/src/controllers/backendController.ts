
import { Request, Response } from 'express';
import { BackendService } from '../services/backendService';

let backendService = new BackendService();

export class BackendController {

    public createProject(req: Request, res: Response) {
        backendService.createProject(req, (response, status) => {
            if (status) {
                res.status(status);
            } else {
                res.status(200);
            }
            res.json(response);
        })
    }
}