import { FlowController } from "../controllers/FlowController";
import { ProjectFlowController } from "../controllers/ProjectFlowController";
import { QuickConnectorsController } from '../controllers/quickConnectorsController'
import { ProjectFlowComponentController } from '../controllers/ProjectFlowComponentController'
import { Request, Response, NextFunction } from "express";

export class Routes {

    public flowController: FlowController = new FlowController();
    public projectFlowController: ProjectFlowController = new ProjectFlowController();
    public qucikConnectorController: QuickConnectorsController = new QuickConnectorsController();
    public projectFlowComponentController: ProjectFlowComponentController = new ProjectFlowComponentController();

    public routes(app): void {
        app.route('/health/flow-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })

        app.route('/flow/save').post(this.flowController.saveFlow);
        app.route('/flow/connectors').post(this.flowController.saveConnectors);
        app.route('/flow/update').put(this.flowController.updateFlow);
        app.route('/flow/getall').get(this.flowController.getAllFlow);
        app.route('/flow/get').get(this.flowController.getFlowById);
        app.route('/flow/feature/get').post(this.flowController.getFeatureFlows);
        app.route('/flow/feature/language/get').post(this.flowController.getFeatureFlowsByLanguage);
        app.route('/flow/delete').delete(this.flowController.deleteFlow);
        app.route('/flow/project/get').get(this.flowController.getFlowByProjectId);

        // project flows route
        app.route('/flow/project/save').post(this.projectFlowController.createProjectFlow);
        app.route('/flow/project/bulksave').post(this.projectFlowController.ProjectFlow);
        app.route('/flow/project/getall').get(this.projectFlowController.getAllProjectFlow);
        app.route('/flow/project/updatecomponent').put(this.projectFlowController.updateFlowComponents);
        app.route('/flow/getprojectflowbyid/:id').get(this.projectFlowController.getProjectFlowById);
        app.route('/flow/projectfeature/get').post(this.projectFlowController.getProjectFeatureFlows);
        app.route('/flow/project/delete').delete(this.projectFlowController.deleteProjectFlow);

        //project flow components service

        app.route('/flowcomponent/project/save').post(this.projectFlowComponentController.saveProjectFlowComponent);
        app.route('/flowcomponent/project/getall').get(this.projectFlowComponentController.getProjectFlowComponent);
        app.route('/flowcomponent/project/getbyid/:id').get(this.projectFlowComponentController.getProjectFlowComponentById);
        app.route('/flowcomponent/project/delete').delete(this.projectFlowComponentController.deleteProjectFlowComp);
        app.route('/flowcomponent/project/updateconnector').put(this.projectFlowComponentController.updateProjectFlowComponent);


        //quick connectors

        app.route('/save/quickConnectors').post(this.qucikConnectorController.saveConnectors);
        app.route('/get/connectorsbyids').post(this.qucikConnectorController.getConnectorsByIds)
        app.route('/get/quickConnectorbyid/:id').get(this.qucikConnectorController.getConnectorById);
        app.route('/quickUpdateConnectorsById/:id').put(this.qucikConnectorController.updateQuickConnectorsById)
        app.route('/getConnectors').get(this.qucikConnectorController.getConnectors)

        //quick connectors

        app.route('/save/quickConnectors').post(this.qucikConnectorController.saveConnectors)
        app.route('/get/quickConnectorbyentity/:entityid').get(this.qucikConnectorController.getConnectorByEntity)
        app.route('/delete/quickConnectorbyid/:id').delete(this.qucikConnectorController.deleteConnectorById)
        app.route('/delete/quickConnectorbyentityid/:entityid').delete(this.qucikConnectorController.deleteConnectorByEntityId)
        app.route('/get/quickConnectorbyid/:id').get(this.qucikConnectorController.getConnectorById)
    }
}