
import { ReactController } from '../controller/reactgencontroller';
import { Request, Response, NextFunction } from "express";

export class Routes {

    public reactController: ReactController = new ReactController();

    public routes(app): void {

        app.route('/health/entity-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
        app.route('/react/project').post(this.reactController.createReactProject);
    }
}