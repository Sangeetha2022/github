import { Request, Response, NextFunction } from "express";
import { ProjectController } from "../controllers/GithubController";

export class Routes {

    public projectController: ProjectController = new ProjectController()

    public routes(app): void {

        app.route('/health/githubmanager').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })

        app.route('/github/deploy/project/:proj_id').post(this.projectController.deployToSourceRepositories);

    }
}