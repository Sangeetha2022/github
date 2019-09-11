
import { Request, Response, NextFunction } from "express";
import {FredController} from '../controllers/fredController';

export class Routes {

    public fredController: FredController = new FredController();
    
    public routes(app): void {

        app.route('/health/entity-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })

        app.route('/fred').post(this.fredController.getFred);
       

    }
}