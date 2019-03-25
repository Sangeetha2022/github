import { Request, Response, NextFunction } from 'express';
import { ScreenService } from '../services/screen.service';

let screenService = new ScreenService()

export class ScreenController {

    public saveScreen(req: Request, res: Response, next: NextFunction) {
        screenService.saveScreen(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public getAllScreen(req: Request, res: Response, next: NextFunction) {
        screenService.getAllScreen(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public getScreenByID(req: Request, res: Response, next: NextFunction) {
        screenService.getScreenByID(req, next, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public getScreenByFeatureName(req: Request, res: Response, next: NextFunction) {
        screenService.getScreenByFeatureName(req, next, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public deleteScreen(req: Request, res: Response, next: NextFunction) {
        screenService.deleteScreen(req, next, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public updateScreen(req: Request, res: Response, next: NextFunction) {
        screenService.updateScreen(req, next, (response) => {
            res.status(200);
            res.json(response);
        })
    }

}