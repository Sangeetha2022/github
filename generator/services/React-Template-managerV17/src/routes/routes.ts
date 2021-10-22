
import { ReactTemplateController } from '../controllers/reactTemplateController';
import { Request, Response } from 'express';

export class Routes {

    public reactTemplateController: ReactTemplateController = new ReactTemplateController();

    public routes(app): void {

        app.route('/health/entity-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
        app.route('/template/react').post(this.reactTemplateController.createReactTemplate);
    }
}