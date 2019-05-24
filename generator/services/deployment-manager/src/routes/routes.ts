import { Request, Response, NextFunction } from "express";
import { DeploymentController } from "../controllers/local/deployment.controller";
import { AWSDeploymentController } from "../controllers/aws/aws-deployment.controller";
import { GeppettoAWSDeploymentController } from "../controllers/aws/gep-aws-deployment.controller";
import { GeppettoLocalDeploymentController } from "../controllers/local/gep-local-deployment.controller";
import { IPAController } from "../controllers/aws/ios-build.controller";

export class Routes {
    public deployController: DeploymentController = new DeploymentController();
    public geppettoLocalDeploymentController : GeppettoLocalDeploymentController = new GeppettoLocalDeploymentController();
    public awsDeployController: AWSDeploymentController = new AWSDeploymentController();
    public geppettoAWSDeploymentController : GeppettoAWSDeploymentController = new GeppettoAWSDeploymentController();
    public ipaController : IPAController = new IPAController();

    public routes(app): void {
        app.route('/health/deploymentmanager').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })

        app.route('/generate/deployment/local/:project_id').post(this.deployController.generateDeploymentLocal);
         
        app.route('/generate/deployment/aws/:project_id').post(this.awsDeployController.generateDeploymentAWS);

        app.route('/generate/deployment/aws/geppetto/:environment').post(this.geppettoAWSDeploymentController.ReDeploymentAWS);

        app.route('/generate/deployment/local/geppetto/:environment').post(this.geppettoLocalDeploymentController.ReDeploymentLocal);


        app.route('/generate/ios/:project_id').post(this.ipaController.generateIPA);
    }
}