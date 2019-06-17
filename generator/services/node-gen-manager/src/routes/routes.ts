
import { NodeController } from '../controllers/NodeController';
import { ApiGatewayController } from '../controllers/ApiGatewayController';
import { Request, Response, NextFunction } from "express";

export class Routes {

    public nodeController: NodeController = new NodeController();
    public apiGatewayController: ApiGatewayController = new ApiGatewayController();

    public routes(app): void {

        app.route('/health/entity-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
        app.route('/node/project').post(this.nodeController.createProjectNode);
        app.route('/node/apigateway/project').post(this.apiGatewayController.createApiGateway);
    }
}