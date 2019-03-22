
import { ScreenController } from '../controllers/ScreenController';
import { Request, Response, NextFunction } from "express";

export class Routes {

    public screenController: ScreenController = new ScreenController();

    public routes(app): void {

        app.route('/health/screen-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
        app.route('/generate/screen').post(this.screenController.generateScreen);
        
    }
}