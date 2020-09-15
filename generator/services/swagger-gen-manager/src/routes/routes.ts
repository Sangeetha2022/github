import { SwaggerGenController } from '../controllers/SwaggerGenController';
import { Request, Response } from 'express';
export class Routes {


    public swaggerGenController: SwaggerGenController = new SwaggerGenController()

    public routes(app, socket): void {
        app.route('/health/generater-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })


        app.route('/swagger/create').post(this.swaggerGenController.createSwagger);

        }
}