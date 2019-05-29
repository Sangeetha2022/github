import { DataStoreController } from '../controllers/DataStoreController';
import { Request, Response } from 'express';
export class Routes {


    public dataStoreController: DataStoreController = new DataStoreController()

    public routes(app, socket): void {
        app.route('/health/generater-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })


        app.route('/datastore/project').post(this.dataStoreController.createProject);

        }
}