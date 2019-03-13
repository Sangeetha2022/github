import { Request, Response, NextFunction } from 'express';
import { Loginservice } from '../service/loginservice';
import { Consentservice } from '../service/consentservice';
import { AuthorizationToken } from '../service/redirecttoken';

export class Routes {

    public loginservice: Loginservice = new Loginservice()

    public consentservice: Consentservice = new Consentservice()

    public authorize: AuthorizationToken = new AuthorizationToken()

    public routes(app): void {

        // Login get and post call
        app.route('/login').get(this.loginservice.getlogin);
        app.route('/login').post(this.loginservice.postlogin);

        // Consent get and post call
        app.route('/consent').get(this.consentservice.getconsent);
        app.route('/consent').post(this.consentservice.postconsent);

        // Authorization token
        app.route('/authorize').post(this.authorize.authorizetoken);
        
    }
}