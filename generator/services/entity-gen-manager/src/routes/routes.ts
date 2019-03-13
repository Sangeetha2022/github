
import { EntityController } from '../controllers/EntityController';
import { EntityTypeController } from '../controllers/EntityTypeController';
import { Request, Response, NextFunction } from "express";

export class Routes {

    public entityController: EntityController = new EntityController();
    public entityTypeController: EntityTypeController = new EntityTypeController();

    public routes(app): void {

        app.route('/health/entity-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
        app.route('/generate/:projectId/entity').get(this.entityController.generateEntity);
        
    }
}