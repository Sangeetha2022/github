import { Request, Response } from 'express';
import { SefService } from '../service/sefgenservice';

let sefService = new SefService();

export class SefController {
    constructor() { }

    public createSefProject(req: Request, res: Response) {
        sefService.createSefProject(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}