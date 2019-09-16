import { Request, Response, NextFunction } from "express";
import { DeleteController } from '../controllers/delete.controller'

export class Routes {
    public deleteController: DeleteController = new DeleteController();

    public routes(app): void {

        app.route('/health/delete-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
        app.route('/delete/projectflow/:id').delete(this.deleteController.deleteProjectFlow);
    }

}