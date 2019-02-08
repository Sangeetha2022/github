import { Request, Response, NextFunction } from "express";
import { ProjectController } from "../controllers/ProjectController";

export class Routes {

    public projectController: ProjectController = new ProjectController()

    public routes(app): void {

        app.route('/health/project-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })

        app.route('/add')
            .post(this.projectController.addProject);

        app.route('/getall')
            .get(this.projectController.getAllProject)

        app.route('/getbyid/:id')
            .get(this.projectController.getProjectByID)

        app.route('/update/:id')
            .put(this.projectController.updateProject)

        app.route('/delete/:id')
            .delete(this.projectController.deleteProject)

    }
}