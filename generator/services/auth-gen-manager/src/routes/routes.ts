import {AuthController} from '../controllers/authController'
import { AuthFrontendController } from '../controllers/authFrontendController';
export class Routes {

    public authController: AuthController = new AuthController();
    public frontendcontroller: AuthFrontendController = new AuthFrontendController();
    public routes(app): void {

        app.route('/auth').get(this.authController.auth);
        app.route('/auth/frontend').get(this.frontendcontroller.authfrontend);
        
    }
}