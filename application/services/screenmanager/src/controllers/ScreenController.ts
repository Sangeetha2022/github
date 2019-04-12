import { Request, Response } from 'express';
import { ScreenService } from '../services/ScreenService';

let screenService = new ScreenService();

export class ScreenController {

    public createScreen(req: Request, res: Response) {
        screenService.createScreen(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public getAllScreen(req: Request, res: Response) {
        screenService.getAllScreen(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public getAllScreenByProjectId(req: Request, res: Response) {
        screenService.getAllScreenByProjectId(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }


    public getAllScreenByProjectAndFeatureId(req: Request, res: Response) {
        screenService.getAllScreenByProjectAndFeatureId(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}