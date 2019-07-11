import {AdminController} from '../controllers/adminController'

const adminControler = new AdminController()

export class Routes {

    public routes(app): void { 
        app.route('/admin').get(adminControler.admin)
    
        
    }

}