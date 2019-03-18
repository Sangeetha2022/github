import { FlowController } from "../controllers/featureflow.controller";
import { Request, Response, NextFunction } from "express";
import { ScreenController } from "../controllers/screen.controller";

export class Routes {

    public flowController: FlowController = new FlowController();
    public screenController: ScreenController = new ScreenController();

    public routes(app): void {
        app.route('/health/flow-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
        //flow routes
        app.route('/feature-flow/save').post(this.flowController.saveFeatureFlow);
        app.route('/feature-flow/getall').get(this.flowController.getAllFeatureFlow);
        app.route('/feature-flow/getbyid/:id').get(this.flowController.getFeatureFlowByID);
        app.route('/feature-flow/getbyid/:id/details').get(this.flowController.getFeatureFlowDetails);
        app.route('/feature-flow/delete/:id').delete(this.flowController.deleteFeatureFlow);
        app.route('/feature-flow/update/:id').put(this.flowController.updateFeatureFlow);

        app.route('/feature-flow/:id/add/flow_comp').post(this.flowController.addFeatureFlowComponent);
        app.route('/feature-flow/flow_comp/:id/update').put(this.flowController.updateFeatureFlowComponent);
        // app.route('/feature-flow/flow_comp/:id/remove').delete(this.flowController.deleteFeatureFlowComponent);

        // screen 

        app.route('/screen/save').post(this.screenController.saveScreen);
        app.route('/screen/getall').get(this.screenController.getAllScreen);
        app.route('/screen/getbyid/:id').get(this.screenController.getScreenByID);
        app.route('/screen/delete/:id').delete(this.screenController.deleteScreen);
        app.route('/screen/update/:id').put(this.screenController.updateScreen);

    }
}