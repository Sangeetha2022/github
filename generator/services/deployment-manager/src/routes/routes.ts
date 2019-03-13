import { Request, Response, NextFunction } from "express";
import { DeploymentController } from "../controllers/local/deployment.controller";
import { AWSDeploymentController } from "../controllers/aws/aws-deployment.controller";

export class Routes {
    public deployController: DeploymentController = new DeploymentController();
    public awsDeployController: AWSDeploymentController = new AWSDeploymentController()

    public routes(app): void {
        app.route('/health/deploymentmanager').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })

        app.route('/generate/deployment/local/:project_id').post(this.deployController.generateDeploymentLocal);
         

        app.route('/generate/deployment/aws/:project_id').post(this.awsDeployController.generateDeploymentAWS);
    }
}