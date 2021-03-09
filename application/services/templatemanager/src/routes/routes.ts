import { Request, Response, NextFunction } from "express";
import { TemplateController } from "../controllers/template.controller";
import { TemplateParserController } from '../controllers/templateParser.controller';
export class Routes {

    public templateController: TemplateController = new TemplateController();
    public templateParserController: TemplateParserController = new TemplateParserController();


    public routes(app): void {

        app.route('/health/project-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })

        app.route('/template/save').post(this.templateController.addTemplate);
        app.route('/project/template/save').post(this.templateController.addProjectTemplate);
        app.route('/template/get/project/:projectid').get(this.templateController.getAllTemplateByProject)
        app.route('/project/template/:projectid').get(this.templateController.getProjectTemplateByProject)
        app.route('/template/get/:id').get(this.templateController.getTemplateByID)
        app.route('/template/getall').get(this.templateController.getAllTemplates)
        app.route('/template/update/:id').put(this.templateController.updateTemplate)
        app.route('/template/delete/:id').delete(this.templateController.deleteTemplate)

        //to get templatebyname for a project
        app.route('/template/gettemplatename').get(this.templateController.getTemplateByName);

        // template parser
        app.route('/templateparser/get').get(this.templateParserController.getAllTemplateParser);

    }
}