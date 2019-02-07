import { MicroFlowController } from "../controllers/MicroFlowController";

export class Routes {

    public flowController: MicroFlowController = new MicroFlowController()

    public routes(app): void {

        app.route('/flow/getall').get(this.flowController.getAllFlow);
        app.route('/microflow/getbyid/:id').get(this.flowController.getFlowByID);
        app.route('/microflow/getbycomp/:name').get(this.flowController.getMicroFlowByName);

    }
}