
import { Request, Response, NextFunction } from "express";
import { CustomConnenctorsController } from '../controllers/customConnectorsController';

export class Routes {

    public customConnectorController: CustomConnenctorsController = new CustomConnenctorsController();

    public routes(app): void {

        app.route('/health/entity-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })

        app.route('/quick/test').post(this.customConnectorController.quickTestcustomConnectors)


    }
}