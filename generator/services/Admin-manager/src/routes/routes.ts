import { AdminController } from '../controllers/adminController';
import { AdminFrontendController } from '../controllers/adminFrontendController';

const adminControler = new AdminController();
const adminFrontendController = new AdminFrontendController();

export class Routes {

    public routes(app): void {
        app.route('/admin').get(adminControler.admin);
        app.route('/admin/frontend').get(adminFrontendController.adminfrontend);

    }

}