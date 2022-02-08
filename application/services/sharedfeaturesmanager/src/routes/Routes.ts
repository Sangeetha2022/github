import { Request, Response, NextFunction } from "express";
import { gfcController } from '../controller/gfcController';


export class Routes {
    private gfc: gfcController = new gfcController();
    
    public routes(app): void {
          app.route('/health/entity-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
        app.route('/gfc/:id').delete(this.gfc.gepfeatureConfDelete);
        app.route('/gfc').get(this.gfc.gepfeatureConfGetAllValues);
        app.route('/gfc').post(this.gfc.gepfeatureConfCreate);
        app.route('/gfc').put(this.gfc.gepfeatureConfUpdate);
        app.route('/gfc/get/search').get(this.gfc.gepfeatureConfSearch);
        app.route('/gfc/get/update').put(this.gfc.gepfeatureConfSearchForUpdate);
        app.route('/gfc/get/:id').get(this.gfc.gepfeatureConfGetNounById);
    }

}