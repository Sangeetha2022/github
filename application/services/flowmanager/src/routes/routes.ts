import { FlowController } from "../controllers/FlowController";
import { FlowComponentController } from "../controllers/FlowComponentController";
import { GenerationFlowController } from "../controllers/GenerationFlowController";

export class Routes {

    public flowComponentController: FlowComponentController = new FlowComponentController()
    public flowController: FlowController = new FlowController()
    public generationFlow: GenerationFlowController = new GenerationFlowController()

    public routes(app): void {
        //flow routes
        app.route('/flow/save').post(this.flowController.saveFlow);
        app.route('/flow/getall').get(this.flowController.getAllFlow);
        app.route('/flow/getbyid/:id').get(this.flowController.getFlowByID);
        app.route('/flow/delete/:id').delete(this.flowController.deleteFlow);

        // flowComponent routes
        app.route('/flow_component/getall').get(this.flowComponentController.getAllFlowComponents);
        app.route('/flow_component/getbyid/:id').get(this.flowComponentController.getFlowComponentsByID);
        app.route('/flow_component/getbyname/:name').get(this.flowComponentController.getFlowComponentsByName);

        app.route('/generation_flow/add').post(this.generationFlow.addGenerationFlow);
        app.route('/generation_flow/getall').get(this.generationFlow.getAllGenerationFlow);
        app.route('/generation_flow/getbyname/:name').get(this.generationFlow.getGenerationFlowByName);
    }
}