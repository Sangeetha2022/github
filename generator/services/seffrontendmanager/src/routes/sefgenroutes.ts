
import { SefController } from '../controller/sefgencontroller';
import { Request, Response, NextFunction } from "express";

export class Routes {

    public sefController: SefController = new SefController();

    public routes(app): void {

        app.route('/health/entity-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
        app.route('/systementry/project').post(this.sefController.createSefProject);
    }
}