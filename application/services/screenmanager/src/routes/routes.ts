
import { ScreenController } from '../controllers/ScreenController';
import { DefaultScreencontroller } from '../controllers/defaultScreencontroller';
import { Request, Response, NextFunction } from "express";

export class Routes {

    public screenController: ScreenController = new ScreenController();
    public defaultController: DefaultScreencontroller = new DefaultScreencontroller();

    public routes(app): void {

        app.route('/health/screen-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
        app.route('/screen/save').post(this.screenController.createScreen);
        app.route('/screen/get').get(this.screenController.getAllScreen);
        app.route('/screen/get/:id').get(this.screenController.getScreenById);
        app.route('/screen/update/:id').post(this.screenController.updateScreen);
        app.route('/screen/delete/:id').delete(this.screenController.deleteScreen);
        app.route('/screen/getbyprojectid/:projectId').get(this.screenController.getAllScreenByProjectId);
        app.route('/screen/getbyprojectandfeatureid/:projectId/:featureId').get(this.screenController.getAllScreenByProjectAndFeatureId);
        app.route('/screen/getbyfeatureid/:id').get(this.screenController.getAllScreenByFeatureId);
        app.route('/screen/template').get(this.screenController.getTemplateByProjectId);

        // default screen created for new project
        app.route('/projects/default/screen').get(this.defaultController.createdefaultscreen);
    }
}