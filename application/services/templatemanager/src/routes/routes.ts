import { Request, Response, NextFunction } from "express";
import { TemplateController } from "../controllers/template.controller"
export class Routes {

    public templateController: TemplateController = new TemplateController()

    public routes(app): void {

        app.route('/health/project-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })

        app.route('/template/save').post(this.templateController.addTemplate);
        app.route('/template/get/project/:projectid').get(this.templateController.getAllTemplateByProject)
        app.route('/template/get/:id').get(this.templateController.getTemplateByID)
        app.route('/template/getall').get(this.templateController.getAllTemplates)
        app.route('/template/update/:id').put(this.templateController.updateTemplate)
        app.route('/template/delete/:id').delete(this.templateController.deleteTemplate)

    }
}