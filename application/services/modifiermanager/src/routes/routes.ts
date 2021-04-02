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
        app.route('/modifier/usage/save').post(this.modifierController.saveModifierUsage);
        app.route('/modifier/usage/get/projectdetials').get(this.modifierController.getModifierByProjectDetails);
        app.route('/modifier/update').put(this.modifierController.updateModifier);
        app.route('/modifier/getall').get(this.modifierController.getAllModifier);
        app.route('/modifier/default/getall').get(this.modifierController.getAllDefaultModifiers);
        app.route('/modifier/get').get(this.modifierController.getModifierById);
        app.route('/modifier/flow/get').post(this.modifierController.getFlowModifiers);
        app.route('/modifier/feature/language/get').post(this.modifierController.getFeatureModifiersByLanguage);
        app.route('/modifier/delete').delete(this.modifierController.deleteModifier);
        app.route('/modifier/project/get').get(this.modifierController.getModifierByProjectId);

    }
}