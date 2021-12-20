
import { AngularController } from '../controller/angulargencontroller';
import { Request, Response, NextFunction } from "express";

export class Routes {

    public angularController: AngularController = new AngularController();

    public routes(app): void {

        app.route('/health/entity-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up',
                version: 'v13'
            })
        })
        app.route('/angularv13/project').post(this.angularController.createAngularProject);
    }
}