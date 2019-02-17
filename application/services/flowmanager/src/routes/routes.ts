import { FlowController } from "../controllers/flow.controller";
import { FlowComponentController } from "../controllers/flowcomponent.controller";
import { ConnectorController } from "../controllers/connector.controller";
import { Request, Response, NextFunction } from "express";

export class Routes {

    public flowComponentController: FlowComponentController = new FlowComponentController()
    public flowController: FlowController = new FlowController()
    public connector: ConnectorController = new ConnectorController()

    public routes(app): void {
        app.route('/health/flow-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
        //flow routes
        app.route('/flow/save').post(this.flowController.saveFlow);
        app.route('/flow/getall').get(this.flowController.getAllFlow);
        app.route('/flow/getbyid/:id').get(this.flowController.getFlowByID);
        app.route('/flow/getbyid/:id/details').get(this.flowController.getFlowDetails);
        app.route('/flow/delete/:id').delete(this.flowController.deleteFlow);
        app.route('/flow/update/:id').put(this.flowController.updateFlow);

        app.route('/flow/:id/add/flow_comp').post(this.flowController.addFlowComponent);
        app.route('/flow/:id/update/flow_comp').put(this.flowController.updateFlowComponent);

        app.route('/flow/:id/:cname/add/lconnector').post(this.flowController.addLinkedConnector);
        app.route('/flow/:id/:cname/update/lconnector').put(this.flowController.updateLinkedConnector);

        // flowComponent routes
        app.route('/flow_component/save').post(this.flowComponentController.saveFlowComonents);
        app.route('/flow_component/update/:id').put(this.flowComponentController.updateFlowComponent);
        app.route('/flow_component/getall').get(this.flowComponentController.getAllFlowComponents);
        app.route('/flow_component/getbyid/:id').get(this.flowComponentController.getFlowComponentsByID);
        app.route('/flow_component/getbyname/:name').get(this.flowComponentController.getFlowComponentsByName);

        //connector
        app.route('/connector/add').post(this.connector.saveConnector);
        app.route('/connector/update/:id').put(this.connector.updateConnector);
        app.route('/connector/getall').get(this.connector.getAllConnector);
        app.route('/connector/getbyid/:id').get(this.connector.getConnectorByID);
        app.route('/connector/delete/:id').delete(this.connector.deleteConnector);

    }
}