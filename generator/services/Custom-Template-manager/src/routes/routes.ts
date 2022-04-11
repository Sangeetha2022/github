
import { CustomTemplateController } from '../controllers/customTemplateController';
import { Request, Response } from 'express';

export class Routes {

    public customTemplateController: CustomTemplateController = new CustomTemplateController();

    public routes(app): void {

        app.route('/health/entity-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
        app.route('/template/customtemplatev13').post(this.customTemplateController.createCustomTemplate);
    }
}