import { FeatureController } from "../controllers/feature.controller";
import { FeatureDetailsController } from "../controllers/featuredetails.controller";
import { Request, Response, NextFunction } from "express";
import { FeatureFlowController } from "../controllers/featureflow.controller";
import { FeatureFlowCompController } from "../controllers/featureflowcomp.controller";
import { FeatureFlowEntityController } from "../controllers/featureflowentity.controller";

export class Routes {

    public featureController: FeatureController = new FeatureController()
    public featureDetailsController: FeatureDetailsController = new FeatureDetailsController()
    public featureFlowController: FeatureFlowController = new FeatureFlowController()
    public featureFlowCompController: FeatureFlowCompController = new FeatureFlowCompController()
    public featureFlowEntityController: FeatureFlowEntityController = new FeatureFlowEntityController()

    public routes(app): void {
        app.route('/health/micro-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
        // Feature
        app.route('/feature/save').post(this.featureController.saveFeature);
        app.route('/feature/update/:id').put(this.featureController.updateFeature);
        app.route('/feature/getall').get(this.featureController.getAllFeature);
        app.route('/feature/getbyid/:id').get(this.featureController.getFeatureByID);
        app.route('/feature/delete/:id').delete(this.featureController.deleteFeature);
        app.route('/feature/getbyprojectid/:id').get(this.featureController.getFeatureByProjectId);

        // Feature Details
        app.route('/feature/details/addfile').post(this.featureDetailsController.uploadeFeaturefile);
        app.route('/feature/details/getall').get(this.featureDetailsController.getAllFeatureDetails);
        app.route('/feature/details/getbyid/:id').get(this.featureDetailsController.getFeatureDetailsById);
        app.route('/feature/details/getbyfeatureid/:id').get(this.featureDetailsController.getFeatureDetailsByFeatureid);
        app.route('/feature/details/getentitybyfeatureid/:id').get(this.featureDetailsController.getFeatureEntityByFeatureid);


        //Feature Flow
        app.route('/feature-flow/save').post(this.featureFlowController.saveFeatureFlow);
        // app.route('/feature-flow/update/:id').put(this.featureFlowController.updateFeatureFlow);
        // app.route('/feature-flow/getall').get(this.featureFlowController.getAllFeatureFlow);
        app.route('/feature-flow/getbyid/:id').get(this.featureFlowController.getFeatureFlowByID);
        app.route('/feature-flow/getbyfeatureid/:id').get(this.featureFlowController.getFeatureFlowByFeatureId);
        // app.route('/feature-flow/delete/:id').delete(this.featureFlowController.deleteFeatureFlow);

        //Feature FlowComp
        // app.route('/feature-comp/save').post(this.featureFlowCompController.saveFeatureFlowComp);
        // app.route('/feature-comp/update/:id').put(this.featureFlowCompController.updateFeatureFlowComp);
        app.route('/feature-comp/getbyflowid/:id').get(this.featureFlowCompController.getFeatureFlowCompByFlowID);
        // app.route('/feature-comp/getall').get(this.featureFlowCompController.getAllFeatureFlowComp);
        // app.route('/feature-comp/getbyid/:id').get(this.featureFlowCompController.getFeatureFlowCompByID);
        // app.route('/feature-comp/delete/:id').delete(this.featureFlowCompController.deleteFeatureFlowComp);

        //Feature FlowEntity
        // app.route('/feature-entity/save').post(this.featureFlowEntityController.saveFeatureFlowEntity);
        // app.route('/feature-entity/update/:id').put(this.featureFlowEntityController.updateFeatureFlowEntity);
        // app.route('/feature-entity/getall').get(this.featureFlowEntityController.getAllFeatureFlowEntity);
        // app.route('/feature-entity/getbyid/:id').get(this.featureFlowEntityController.getFeatureFlowEntityByID);
        // app.route('/feature-entity/delete/:id').delete(this.featureFlowEntityController.deleteFeatureFlowEntity);
    }
}