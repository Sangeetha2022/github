import { Request, Response, NextFunction } from "express";
import { InfrastructureController } from "../controllers/infrastructure.controller";

export class Routes {

    public infraController: InfrastructureController = new InfrastructureController()

    public routes(app): void {

        app.route('/health/infrastructuremanager').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })

        app.route('/generate/infrastructure/local/:project_id').post(this.infraController.generateInfrastructureLocal);

    }
}