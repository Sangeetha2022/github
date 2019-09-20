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
        app.route('/delete/project/:id').delete(this.deleteController.deleteProjectById);

        // delete entity flow

        app.route('/delete/entity/:id').delete(this.deleteController.deleteEntity);

        // delete feature flow

        app.route('/delete/feature/:id').delete(this.deleteController.deleteFeature);

        // delete menu flow

        app.route('/delete/menu/:id').delete(this.deleteController.deleteMenu);

        // delete screen 

        app.route('/delete/screen/:id').delete(this.deleteController.deleteScreen);

        // delete flow 
        
        app.route('/delete/flow/:id').delete(this.deleteController.deleteFlow);


    }

}