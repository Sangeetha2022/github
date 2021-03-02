import { modifierController } from "../controllers/ModifierController";
import { Request, Response, NextFunction } from "express";

export class Routes {

    public modifierController: modifierController = new modifierController();

    public routes(app): void {
        app.route('/health/modifier-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })

        app.route('/modifier/save').post(this.modifierController.saveModifier);
        app.route('/modifier/update').put(this.modifierController.updateModifier);
        app.route('/modifier/getall').get(this.modifierController.getAllModifier);
        app.route('/modifier/get').get(this.modifierController.getModifierById);
        app.route('/modifier/feature/get').post(this.modifierController.getFeatureModifiers);
        app.route('/modifier/feature/language/get').post(this.modifierController.getFeatureModifiersByLanguage);
        app.route('/modifier/delete').delete(this.modifierController.deleteModifier);
        app.route('/modifier/project/get').get(this.modifierController.getModifierByProjectId);

    }
}