import { FrontendController } from '../controllers/frontendController';
import { Request, Response } from 'express';
export class Routes {


    public frontendController: FrontendController = new FrontendController();

    public routes(app, socket): void {
        app.route('/health/frontend-gen-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })


        app.route('/frontend/project').post(this.frontendController.createProject);

        }
}