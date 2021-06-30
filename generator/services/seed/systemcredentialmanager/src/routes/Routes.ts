import { Request, Response, NextFunction } from "express";
import { vaultController } from '../controller/vaultController';


export class Routes {
    private vault: vaultController = new vaultController();
    
    public routes(app): void {
          app.route('/health/entity-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
app.route('/vault/get/search').get(this.vault.GpSearch);
app.route('/vault').put(this.vault.GpUpdate);
app.route('/vault').get(this.vault.GpGetAllValues);
app.route('/vault/:id').delete(this.vault.GpDelete);
app.route('/vault').post(this.vault.GpCreate);
     }

}