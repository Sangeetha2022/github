import { Request, Response, NextFunction } from "express";
import { gfcController } from '../controller/gfcController';


export class Routes {
    private gepfeatureconfig: gfcController = new gfcController();
    
    public routes(app): void {
          app.route('/health/entity-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
        app.route('/gfcservice').post(this.gepfeatureconfig.createGepFeaturesServices);
        app.route('/gfcclient').post(this.gepfeatureconfig.createGepFeaturesClient);
     }

}