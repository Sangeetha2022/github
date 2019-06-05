
import { NodeController } from '../controllers/NodeController';
import { Request, Response, NextFunction } from "express";

export class Routes {

    public nodeController: NodeController = new NodeController();

    public routes(app): void {

        app.route('/health/entity-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
        app.route('/node/project').post(this.nodeController.createProjectNode);
    }
}