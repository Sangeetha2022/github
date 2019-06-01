import { MongoGenController } from '../controllers/MongoGenController';
import { Request, Response } from 'express';
export class Routes {


    public mongoGenController: MongoGenController = new MongoGenController()

    public routes(app, socket): void {
        app.route('/health/generater-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })


        app.route('/mongoose/project').post(this.mongoGenController.createProjectModel);

        }
}