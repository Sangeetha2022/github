import { Request, Response, NextFunction } from "express";
import { AcousticController } from '../controllers/acousticcontroller';

export class Routes {

    public acoustic_controller = new AcousticController();

    public routes(app): void {
        
        app.route('/health/').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })


        app.route('/generate/wcm').get(this.acoustic_controller.acousticgenerator);
    }
}