
import { UserTemplateController } from '../controllers/UserTemplateController';


export class Routes {

    public userTemplateController: UserTemplateController = new UserTemplateController();

    public routes(app): void {
        app.route('/user_template/save').post(this.userTemplateController.createUserTemplate);
        app.route('/user_template/get').get(this.userTemplateController.getAllUserTemplate);
    }
}