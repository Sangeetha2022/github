import { Request, Response } from 'express';
import { ScreenService } from '../services/ScreenService';

let screenService = new ScreenService();

export class ScreenController {

    public generateScreen(req: Request, res: Response) {
        screenService.generateScreen(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}