import { Request, Response } from 'express';
import { ReactService } from '../service/reactgenservice';

let reactService = new ReactService();

export class ReactController {
    constructor() { }

    public createReactProject(req: Request, res: Response) {
        reactService.createReactProject(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}