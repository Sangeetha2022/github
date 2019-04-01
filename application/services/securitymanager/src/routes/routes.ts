import { Request, Response, NextFunction } from 'express';
import { Signincontroller } from '../controllers/Signincontrollers';
import { Consentcontroller } from '../controllers/Consentcontrollers';

export class Routes {

    public signincontroller: Signincontroller = new Signincontroller()

    public consentcontroller: Consentcontroller = new Consentcontroller()


    public routes(app): void {

        app.route('/signup').post(this.signincontroller.signup);
        app.route('/login').post(this.signincontroller.login);
        app.route('/consent').put(this.consentcontroller.consent);
        app.route('/logout').post(this.signincontroller.logout);

        
    }
}