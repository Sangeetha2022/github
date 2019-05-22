import { BackendController } from '../controllers/backendController';
import { Request, Response } from 'express';
export class Routes {


    public backendController: BackendController = new BackendController()

    public routes(app, socket): void {
        app.route('/health/generater-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })


        app.route('/backend/project').post(this.backendController.createProject);

        }
}