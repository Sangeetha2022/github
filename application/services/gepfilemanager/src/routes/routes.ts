import { Request, Response, NextFunction } from "express";
import { AuthController } from '../controller/authController';
import { AttachmentController } from "../controller/attachmentController";


export class Routes {
    private auth: AuthController = new AuthController();
    private attach: AttachmentController = new AttachmentController();

    public routes(app): void {
        app.route('/health/entity-service').get((req: Request, res: Response) => {
            res.status(200).send({
                status: 'up'
            })
        })

        //User routes
        // app.route('/signup').post(this.auth.signup);
        // app.route('/login').post(this.auth.login);
        // app.route('/logout').post(this.auth.logout);
        // app.route('/getallusers').get(this.auth.getAllUsers);
        // app.route('/getuser/:id').get(this.auth.getUserById);
        // app.route('/updateuser').put(this.auth.updateUser);
        // app.route('/deleteuser/:id').delete(this.auth.userDelete);

        //attachemnt routes
        app.route('/addAttachment').post(this.attach.addAttachment);
        app.route('/deleteAttachment').delete(this.attach.deleteAttachment);
        app.route('/downloadAttachment').get(this.attach.downloadAttachment);
    }

}