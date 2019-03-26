import { Request, Response, NextFunction } from "express";
import { LocalInfrastructureController } from "../controllers/local.controller";
import { AWSInfrastructureController } from "../controllers/aws.controller";

export class Routes {

    public localInfraController: LocalInfrastructureController = new LocalInfrastructureController()

    public awsInfrastructureController: AWSInfrastructureController = new AWSInfrastructureController()

    public routes(app): void {

        app.route('/health/infrastructuremanager').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })

        app.route('/generate/infrastructure/local/:project_id').post(this.localInfraController.generateInfrastructureLocal);

        app.route('/generate/infrastructure/aws/:project_id').post(this.awsInfrastructureController.generateInfrastructureAWS);
    }
}