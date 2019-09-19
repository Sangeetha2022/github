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

        // delete project flow
        app.route('/delete/projectflow/:id').delete(this.deleteController.deleteProjectFlow);

        // delete entity flow

        app.route('/delete/entityflow/:id').delete(this.deleteController.deleteEntityFlow);

        // delete feature flow

        app.route('/delete/featureflow/:id').delete(this.deleteController.deleteFeatureFlow);

        // delete menu flow

        app.route('/delete/menuflow/:id').delete(this.deleteController.deleteMenuFlow);

        // delete screen 
        
        app.route('/delete/screenflow/:id').delete(this.deleteController.deleteScreenFlow);


    }

}