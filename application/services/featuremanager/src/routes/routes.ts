import { FeatureController } from "../controllers/feature.controller";
import { Request, Response, NextFunction } from "express";

export class Routes {

    public featureController: FeatureController = new FeatureController()

    public routes(app): void {
        app.route('/health/micro-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
        app.route('/feature/save').post(this.featureController.saveFeature);
        app.route('/feature/update/:id').put(this.featureController.updateFeature);
        app.route('/feature/getall').get(this.featureController.getAllFeature);
        app.route('/feature/getbyid/:id').get(this.featureController.getFeatureByID);
        app.route('/feature/delete/:id').delete(this.featureController.deleteFeature);
        app.route('/feature/getbyfeature/:name').get(this.featureController.getFeatureByName);
    }
}