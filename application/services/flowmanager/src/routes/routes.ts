import { FlowController } from "../controllers/flow.controller";
import { FlowComponentController } from "../controllers/flowcomponent.controller";
import { GenerationFlowController } from "../controllers/generationflow.controller";
import { ConnectorController } from "../controllers/connector.controller";
import {LinkConnectorController} from "../controllers/linkedconnector.controller"
import { Request, Response, NextFunction } from "express";

export class Routes {

    public flowComponentController: FlowComponentController = new FlowComponentController()
    public flowController: FlowController = new FlowController()
    public generationFlow: GenerationFlowController = new GenerationFlowController()
    public connector: ConnectorController = new ConnectorController()
    public linkConnector: LinkConnectorController = new LinkConnectorController()


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
        app.route('/flow/delete/:id').delete(this.flowController.deleteFlow);
        app.route('/flow/update/:id').put(this.flowController.updateFlow);

        // flowComponent routes
        app.route('/flow_component/save').post(this.flowComponentController.saveFlowComonents);
        app.route('/flow_component/update/:id').put(this.flowComponentController.updateFlowComponent);
        app.route('/flow_component/getall').get(this.flowComponentController.getAllFlowComponents);
        app.route('/flow_component/getbyid/:id').get(this.flowComponentController.getFlowComponentsByID);
        app.route('/flow_component/getbyname/:name').get(this.flowComponentController.getFlowComponentsByName);
        
        //microFlow
        app.route('/generation_flow/add').post(this.generationFlow.addGenerationFlow);
        app.route('/generation_flow/update/:id').put(this.generationFlow.updateGenerationFlow);
        app.route('/generation_flow/getall').get(this.generationFlow.getAllGenerationFlow);
        app.route('/generation_flow/getbyid/:id').get(this.generationFlow.getGenerationFlowByID);
        app.route('/generation_flow/getbyname/:name').get(this.generationFlow.getGenerationFlowByName);

        //connector
        app.route('/connector/add').post(this.connector.saveConnector);
        app.route('/connector/update').put(this.connector.updateConnector);
        app.route('/connector/getall').get(this.connector.getAllConnector);
        app.route('/connector/getbyid/:id').get(this.connector.getConnectorByID);
        app.route('/connector/getbyname/:name').get(this.connector.getConnectorByName);
        app.route('/connector/delete/:id').delete(this.connector.deleteConnector);

        //linkConnector
        app.route('/linked_connector/add').post(this.linkConnector.saveLinkedConnector);
        app.route('/linked_connector/update').put(this.linkConnector.updateLinkedConnector);
        app.route('/linked_connector/getall').get(this.linkConnector.getAllLinkedConnector);
        app.route('/linked_connector/getbyid/:id').get(this.linkConnector.getLinkedConnectorByID);
        app.route('/linked_connector/getbyname/:name').get(this.linkConnector.getLinkedConnectorByName);
        app.route('/linked_connector/delete/:id').delete(this.linkConnector.deleteLinkedConnector);
    }
}