import { BackendController } from '../controllers/backendController';
import { ApiGatewayController } from '../controllers/apiGatewayController';
import { BackendAdminController } from '../controllers/backendAdminController';
import { Request, Response } from 'express';
export class Routes {


    public backendController: BackendController = new BackendController();
    public apiGatewayController: ApiGatewayController = new ApiGatewayController();
    public backendadmin: BackendAdminController = new BackendAdminController();

    public routes(app, socket): void {
        app.route('/health/generater-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })


        app.route('/backend/project').post(this.backendController.createProject);
        app.route('/backend/apigateway/project').post(this.apiGatewayController.createApiGateway);
        app.route('/backend/adminmanager').post(this.backendadmin.admincontroller);
        }
}