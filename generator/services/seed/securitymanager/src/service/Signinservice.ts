import { Request, response } from 'express';
import { SigninDao } from '../daos/SigninDao';
const logger = require('../config/Logger');

let signindao = new SigninDao();
export class Signinservice {

    public signupservice(req: Request, callback) {
        logger.info('Enter into Signinservice.ts: signupservice');
        const users = req.body;
        signindao.signindao(users, (response) => {
            callback(response);
            logger.info('Exit from Signinservice.ts: signupservice');

        });
    }

    public loginservice(req: Request, callback) {
        logger.info('Enter into loginservice');
        const logindetails = req.body;
        signindao.logindao(logindetails, (response) => {
            callback(response)
            logger.info('Exit from Signinservice.ts: loginservice');

        });
    }

    public logoutservice(req: Request, callback) {
        logger.info('Enter into Signinservice.ts: logoutservice');

        const user = req.body.id;
        signindao.logoutdao(user, (response) => {
            callback(response);
            logger.info('Exit from Signinservice.ts: logoutservice');

        })
    }

    public googleservice(req: Request, callback) {
        logger.info('Enter into Signinservice.ts: googleservice');

        const googledata = req.body;
        signindao.googledao(googledata, (response) => {
            callback(response);
            logger.info('Exit from Signinservice.ts: googleservice');

        })
    }

    public getalluserservice(req: Request, callback) {
        logger.info('Enter into Signinservice.ts: getalluserservice');

        signindao.getalluserdao((response) => {
            callback(response);
            logger.info('Exit from Signinservice.ts: getalluserservice');

        })
    }

    public getbyiduserservice(req: Request, callback) {
        logger.info('Enter into Signinservice.ts: getbyiduserservice');

        const userId = req.params.id;
        signindao.getbyiduserdao(userId, (response) => {

            callback(response);
            logger.info('Exit from Signinservice.ts: getbyiduserservice');

        })
    }

    public getrolesservice(req: Request, callback) {

        logger.info('Enter into Signinservice.ts: getrolesservice');

        signindao.getrolesdao((response) => {
            callback(response);
            logger.info('Exit from Signinservice.ts: getrolesservice');

        })
    }

    public updateuserservice(req: Request, callback) {
        logger.info('Enter into Signinservice.ts: updateuserservice');

        const userdetails = req.body;

        signindao.updateuserdao(userdetails, (response) => {
            callback(response);
            logger.info('Exit from Signinservice.ts: updateuserservice');

        })
    }
}