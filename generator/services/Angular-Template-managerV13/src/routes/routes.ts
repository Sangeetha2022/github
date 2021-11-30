
import { AngularTemplateController } from '../controllers/angularTemplateController';
import { Request, Response } from 'express';

export class Routes {

    public angularTemplateController: AngularTemplateController = new AngularTemplateController();

    public routes(app): void {

        app.route('/health/entity-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
        app.route('/template/angularv13').post(this.angularTemplateController.createAngularTemplate);
    }
}