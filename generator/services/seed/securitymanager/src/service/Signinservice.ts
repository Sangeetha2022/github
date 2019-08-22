import { Request, response } from 'express';
import { SigninDao } from '../daos/SigninDao';
const logger = require('../config/Logger');

let signindao = new SigninDao();
export class Signinservice {

    public signupservice(req: Request, callback) {
        logger.info('Enter into Signinservice.ts: signupservice');
        const users = req.body;
        signindao.signindao(users, (response) => {
            logger.info('Exit from Signinservice.ts: signupservice');
            callback(response);

        });
    }

    public loginservice(req: Request, callback) {
        logger.info('Enter into loginservice');
        const logindetails = req.body;
        signindao.logindao(logindetails, (response) => {
            logger.info('Exit from Signinservice.ts: loginservice');
            callback(response)

        });
    }

    public logoutservice(req: Request, callback) {
        logger.info('Enter into Signinservice.ts: logoutservice');

        const user = req.body.id;
        signindao.logoutdao(user, (response) => {
            logger.info('Exit from Signinservice.ts: logoutservice');
            callback(response);

        })
    }

    public googleservice(req: Request, callback) {
        logger.info('Enter into Signinservice.ts: googleservice');

        const googledata = req.body;
        signindao.googledao(googledata, (response) => {
            logger.info('Exit from Signinservice.ts: googleservice');
            callback(response);

        })
    }

    public getalluserservice(req: Request, callback) {
        logger.info('Enter into Signinservice.ts: getalluserservice');

        signindao.getalluserdao((response) => {
            logger.info('Exit from Signinservice.ts: getalluserservice');
            callback(response);

        })
    }

    public getbyiduserservice(req: Request, callback) {
        logger.info('Enter into Signinservice.ts: getbyiduserservice');

        const userId = req.params.id;
        signindao.getbyiduserdao(userId, (response) => {
            logger.info('Exit from Signinservice.ts: getbyiduserservice');
            callback(response);

        })
    }

    public getrolesservice(req: Request, callback) {

        logger.info('Enter into Signinservice.ts: getrolesservice');

        signindao.getrolesdao((response) => {
            logger.info('Exit from Signinservice.ts: getrolesservice');
            callback(response);

        })
    }

    public updateuserservice(req: Request, callback) {
        logger.info('Enter into Signinservice.ts: updateuserservice');

        const userdetails = req.body;

        signindao.updateuserdao(userdetails, (response) => {
            logger.info('Exit from Signinservice.ts: updateuserservice');
            callback(response);

        })
    }
}