import { MicroFlowController } from "../controllers/MicroFlowController";
import { Request, Response, NextFunction } from "express";

export class Routes {

    public microFlowController: MicroFlowController = new MicroFlowController()

    public routes(app): void {
        app.route('/health/micro-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
        app.route('/microflow/save').post(this.microFlowController.saveMicroFlow);
        app.route('/microflow/update').put(this.microFlowController.updateMicroFlow);
        app.route('/microflow/getall').get(this.microFlowController.getAllMicroFlow);
        app.route('/microflow/get').get(this.microFlowController.getMicroFlowByID);
        app.route('/microflow/component/get').post(this.microFlowController.getMicroFlow);
        app.route('/microflow/project/get').get(this.microFlowController.getMicroFlowByProjectId);
        app.route('/microflow/delete').delete(this.microFlowController.deleteMicroFlow);
    }
}