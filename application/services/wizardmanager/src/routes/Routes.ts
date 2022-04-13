import { Request, Response, NextFunction } from "express";
import { WizardController } from '../controller/WizardController';


export class Routes {
    private Wizard: WizardController = new WizardController();
    
    public routes(app): void {
          app.route('/health/entity-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
        app.route('/Wizard/:id').delete(this.Wizard.GpDelete);
app.route('/Wizard/get/search').get(this.Wizard.GpSearch);
app.route('/Wizard/get/update').put(this.Wizard.GpSearchForUpdate);
app.route('/Wizard/:id').get(this.Wizard.GpGetNounById);
app.route('/Wizard').put(this.Wizard.GpUpdate);
app.route('/Wizard').get(this.Wizard.GpGetAllValues);
app.route('/Wizard').post(this.Wizard.GpCreate);
     }

}