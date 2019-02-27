import { GenerationFlowController } from "../controllers/configuration.controller";
import { Request, Response, NextFunction } from "express";

export class Routes {

    public generationFlow: GenerationFlowController = new GenerationFlowController()


    public routes(app): void {
        app.route('/health/flow-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
      
        app.route('/generation_flow/add').post(this.generationFlow.addGenerationFlow);
        app.route('/generation_flow/update/:id').put(this.generationFlow.updateGenerationFlow);
        app.route('/generation_flow/getall').get(this.generationFlow.getAllGenerationFlow);
        app.route('/generation_flow/getbyid/:id').get(this.generationFlow.getGenerationFlowByID);
        app.route('/generation_flow/getbyname/:name').get(this.generationFlow.getGenerationFlowByName);
        app.route('/generation_flow/delete/:id').delete(this.generationFlow.deleteGenerationFlow);

    }
}