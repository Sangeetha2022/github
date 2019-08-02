
import { IonicAppController } from '../controllers/IonicAppController';
import { Request, Response } from 'express';

export class Routes {


    public ionicAppController: IonicAppController = new IonicAppController();

    public routes(app): void {

        app.route('/health/entity-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
        app.route('/generate/ionic').post(this.ionicAppController.generateIonicApp);
    }
}