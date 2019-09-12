import { FlowController } from "../controllers/FlowController";
import { ProjectFlowController } from "../controllers/ProjectFlowController";
import { Request, Response, NextFunction } from "express";

export class Routes {

    public flowController: FlowController = new FlowController();
    public projectFlowController: ProjectFlowController = new ProjectFlowController();

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
        app.route('/flow/delete').delete(this.flowController.deleteFlow);
        app.route('/flow/project/get').get(this.flowController.getFlowByProjectId);

        // project flows route
        app.route('/flow/project/save').post(this.projectFlowController.createProjectFlow);
        app.route('/flow/project/bulksave').post(this.projectFlowController.ProjectFlow);
        app.route('/flow/project/getall').get(this.projectFlowController.getAllProjectFlow);
        app.route('/flow/projectfeature/get').post(this.projectFlowController.getProjectFeatureFlows);
        app.route('/flow/project/delete').delete(this.projectFlowController.deleteProjectFlow);

    }
}