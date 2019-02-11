
import { UserTemplateController } from '../controllers/usertemplate.controller';
import { Request, Response, NextFunction } from "express";

export class Routes {

    public userTemplateController: UserTemplateController = new UserTemplateController();

    public routes(app): void {

        app.route('/health/screen-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })
        app.route('/user_template/save').post(this.userTemplateController.createUserTemplate);
        app.route('/user_template/get').get(this.userTemplateController.getAllUserTemplate);
    }
}