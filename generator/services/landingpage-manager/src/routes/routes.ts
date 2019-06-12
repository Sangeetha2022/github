
import { LandingPageController } from '../controllers/LandingPageController';
import { Request, Response, NextFunction } from "express";

export class Routes {

    public landingPageController: LandingPageController = new LandingPageController();

    public routes(app): void {

        app.route('/health/entity-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
        app.route('/get/landingpage/:projecId').get(this.landingPageController.getLandingPage);
    }
}