import { MicroFlowController } from "../controllers/microflow.controller";
import { Request, Response, NextFunction } from "express";

export class Routes {

    public mflowController: MicroFlowController = new MicroFlowController()

    public routes(app): void {
        app.route('/health/micro-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
        app.route('/microflow/save').post(this.mflowController.saveMicroFlow);
        app.route('/microflow/update').put(this.mflowController.updateMicroFlow);
        app.route('/microflow/getall').get(this.mflowController.getAllMicroFlow);
        app.route('/microflow/get').get(this.mflowController.getMicroFlowByID);
        app.route('/microflow/project/get').get(this.mflowController.getMicroFlowByProjectId);
        app.route('/microflow/delete').delete(this.mflowController.deleteMicroFlow);
    }
}