import { Request, Response, NextFunction } from "express";
import { WizardController } from '../controller/WizardController';


export class Routes 
{
    private Wizard: WizardController = new WizardController();
    
    public routes(app): void 
    {
          app.route('/health/entity-service').get((req: Request, res: Response) => 
          {
            res.status(200).send
            ({
                status: 'up'
            })
          })
          app.route('/wizard/:id').delete(this.Wizard.GpDelete);
          app.route('/wizard/get/search').get(this.Wizard.GpSearch);
          app.route('/wizard/get/update').put(this.Wizard.GpSearchForUpdate);
          app.route('/wizard/:id').get(this.Wizard.GpGetNounById);
          app.route('/wizard').put(this.Wizard.GpUpdate);
          app.route('/wizard').get(this.Wizard.GpGetAllValues);
          app.route('/wizard').post(this.Wizard.GpCreate);
    }

}