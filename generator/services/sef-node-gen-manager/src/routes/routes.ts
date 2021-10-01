
import { SefNodeController } from '../controllers/SefNodeController';
import { ApiGatewayController } from '../controllers/ApiGatewayController';
import { Request, Response, NextFunction } from "express";

export class Routes {

    public sefnodeController: SefNodeController = new SefNodeController();
    public apiGatewayController: ApiGatewayController = new ApiGatewayController();


    public routes(app): void {

        app.route('/health/entity-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
        app.route('/sefnode/project').post(this.sefnodeController.createProjectSefNode);
        // app.route('/sefnode/apigateway/project').post(this.apiGatewayController.createApiGateway);
    }
}