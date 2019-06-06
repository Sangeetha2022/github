import { Request, Response } from 'express';
import { AngularService } from '../services/AngularService';

let angularService = new AngularService();

export class AngularController {
    constructor() { }

    public createAngularProject(req: Request, res: Response) {
        angularService.createAngularProject(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}