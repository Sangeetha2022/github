import { FrontendController } from '../controllers/frontendController';
import { FrontendTemplateController } from '../controllers/frontendTemplateController';
import { Request, Response } from 'express';
export class Routes {


    public frontendController: FrontendController = new FrontendController();
    public frontendTemplateController: FrontendTemplateController = new FrontendTemplateController();

    public routes(app, socket): void {
        app.route('/health/frontend-gen-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })


        app.route('/frontend/project').post(this.frontendController.frontendProject);
        app.route('/frontend/template/project').post(this.frontendTemplateController.frontendTemplateProject);

        }
}