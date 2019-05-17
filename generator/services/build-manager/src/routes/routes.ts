import { Request, Response, NextFunction } from "express";
import { LocalBuildController } from "../controllers/local.controller";
import { AWSBuildController } from "../controllers/aws.controller";

export class Routes {

    public localBuildController: LocalBuildController = new LocalBuildController()

    public awsBuildController: AWSBuildController = new AWSBuildController()

    public routes(app): void {

        app.route('/health/infrastructuremanager').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })

        app.route('/build/project/local/:project_id').post(this.localBuildController.generateBuildLocal);

        app.route('/build/project/aws/:project_id').post(this.awsBuildController.generateBuildAWS);
    }
}