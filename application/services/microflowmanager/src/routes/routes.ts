import { MicroFlowController } from "../controllers/MicroFlowController";
import { Request, Response, NextFunction } from "express";

export class Routes {

    public flowController: MicroFlowController = new MicroFlowController()

    public routes(app): void {
        app.route('/health/micro-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
        app.route('/microflow/save').post(this.flowController.saveMicroFlow);
        app.route('/microflow/update').put(this.flowController.updateMicroFlow);
        app.route('/microflow/getall').get(this.flowController.getAllFlow);
        app.route('/microflow/getbyid/:id').get(this.flowController.getFlowByID);
        app.route('/microflow/delete/:id').delete(this.flowController.deleteMicroFlow);
        app.route('/microflow/getbycomp/:name').get(this.flowController.getMicroFlowByName);
    }
}