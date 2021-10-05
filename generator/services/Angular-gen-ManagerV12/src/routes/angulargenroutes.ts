
import { AngularController } from '../controller/angulargencontroller';
import { Request, Response, NextFunction } from "express";

export class Routes {

    public angularController: AngularController = new AngularController();

    public routes(app): void {

        app.route('/health/entity-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
        app.route('/angular/project').post(this.angularController.createAngularProject);
    }
}