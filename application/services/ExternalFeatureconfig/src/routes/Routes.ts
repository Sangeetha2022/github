import { Request, Response, NextFunction } from "express";
import { externalFeatureController } from '../controller/Externalfeaturecontroller';


export class Routes {
    private externalfeature: externalFeatureController = new externalFeatureController();
    
    public routes(app): void {
          app.route('/health/entity-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
        app.route('/externalfeature/upload').post(this.externalfeature.extfeaturectrl);
        app.route('/externalfeature/get/:id').get(this.externalfeature.externalfeaturegetbyId);
     }

}