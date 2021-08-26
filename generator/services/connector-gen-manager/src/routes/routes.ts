
import { Request, Response, NextFunction } from "express";

import { ConnectorController } from '../controllers/ConnectorController';

export class Routes {

    public connectorController: ConnectorController = new ConnectorController();


    public routes(app): void {

        app.route('/health/entity-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
        app.route('/connector/project').post(this.connectorController);
    }
}