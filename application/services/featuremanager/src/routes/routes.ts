import { FeatureController } from "../controllers/FeatureController";
import { Request, Response } from "express";

export class Routes {

    public featureController: FeatureController = new FeatureController()

    public routes(app): void {
        app.route('/health/micro-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
        // Feature
        app.route('/feature/save').post(this.featureController.saveFeature);
        app.route('/feature/update').put(this.featureController.updateFeature);
        app.route('/feature/getall').get(this.featureController.getAllFeature);
        app.route('/feature/get').get(this.featureController.getFeatureById);
        app.route('/feature/delete').delete(this.featureController.deleteFeature);
        app.route('/feature/deletebyproject/:id').delete(this.featureController.deleteProjectFeature);
        app.route('/feature/project/get').get(this.featureController.getFeatureByProjectId);
        app.route('/feature/update/entity').put(this.featureController.updateFeatureEntity);

        //get FeatureEntity
        app.route('/feature/:id/entity').get(this.featureController.getFeatureIDByEntity);

        app.route('/feature/updateEntity/:featureId').put(this.featureController.featureUpdateEntity)
        app.route('/feature/deleteentity/:featureId/:entityid').delete(this.featureController.featuredeleteEntity);
    }
}