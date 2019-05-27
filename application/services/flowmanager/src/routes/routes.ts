import { FlowController } from "../controllers/FlowController";
import { Request, Response, NextFunction } from "express";

export class Routes {

    public flowController: FlowController = new FlowController()
  
    public routes(app): void {
        app.route('/health/flow-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })

        app.route('/flow/save').post(this.flowController.saveFlow);
        app.route('/flow/update').put(this.flowController.updateFlow);
        app.route('/flow/getall').get(this.flowController.getAllFlow);
        app.route('/flow/get').get(this.flowController.getFlowById);
        app.route('/flow/feature/get').post(this.flowController.getFeatureFlows);
        app.route('/flow/feature/language/get').post(this.flowController.getFeatureFlowsByLanguage);
        // app.route('/flow/feature/backend/get').post(this.flowController.getBackendFlow);
        app.route('/flow/delete').delete(this.flowController.deleteFlow);
        app.route('/flow/project/get').get(this.flowController.getFlowByProjectId);

        
        //flow routes
        // app.route('/flow/save').post(this.flowController.saveFlow);
        // app.route('/flow/getall').get(this.flowComponentController.getAllFlows);
        // app.route('/flow/getbyid/:id').get(this.flowController.getFlowByID);
        // app.route('/flow/getbyid/:id/details').get(this.flowController.getFlowDetails);
        // app.route('/flow/delete/:id').delete(this.flowController.deleteFlow);
        // app.route('/flow/update/:id').put(this.flowController.updateFlow);
        // app.route('/flow/get/:name/name').get(this.flowController.getFlowByname);

        // app.route('/flow/:id/add/flow_comp').post(this.flowController.addFlowComponent);
        // app.route('/flow/flow_comp/:id/update').put(this.flowController.updateFlowComponent);
        // app.route('/flow/flow_comp/:id/remove').delete(this.flowController.updateFlowComponent);

        // app.route('/flow_comp/:id/add/dconnector').post(this.flowController.addLinkedConnector);
        // app.route('/flow_comp/:id/update/dconnector').put(this.flowController.updateLinkedConnector);
        // app.route('/flow_comp/:id/remove/dconnector').delete(this.flowController.updateLinkedConnector);

        // // flowComponent routes
        // app.route('/flow_component/save').post(this.flowComponentController.saveFlowComonents);
        // app.route('/flow_component/update/:id').put(this.flowComponentController.updateFlowComponent);
        // app.route('/flow_component/getall').get(this.flowComponentController.getAllFlowComponents);
        // app.route('/flow_component/getbyid/:id').get(this.flowComponentController.getFlowComponentsByID);
        // app.route('/flow_component/getbyname/:name').get(this.flowComponentController.getFlowComponentsByName);

        // //connector
        // app.route('/connector/add').post(this.connector.saveConnector);
        // app.route('/connector/update/:id').put(this.connector.updateConnector);
        // app.route('/connector/getall').get(this.connector.getAllConnector);
        // app.route('/connector/getbyid/:id').get(this.connector.getConnectorByID);
        // app.route('/connector/delete/:id').delete(this.connector.deleteConnector);

    }
}