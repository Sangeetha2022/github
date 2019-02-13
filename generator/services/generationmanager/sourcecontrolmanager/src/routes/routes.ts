import { Request, Response, NextFunction } from "express";
import { ProjectController } from "../controllers/sourcecontrol.controller";

export class Routes {

    public projectController: ProjectController = new ProjectController()

    public routes(app): void {

        app.route('/health/sourcecontrolmanager').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })

        app.route('/sourcecontrol/deploy/repo/:proj_id').post(this.projectController.deployCodeToRepository);

    }
}