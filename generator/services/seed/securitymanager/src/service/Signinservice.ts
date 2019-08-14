import { Request, response } from 'express';
import { SigninDao } from '../daos/SigninDao';
const logger = require('../config/Logger');

let signindao = new SigninDao();
export class Signinservice {

    public signupservice(req: Request, callback) {
        logger.info('Enter into signupservice');
        const users = req.body;
        signindao.signindao(users, (response) => {
            callback(response);
            logger.info('Exit from signupservice');

        });
    }

    public loginservice(req: Request, callback) {
        logger.info('Enter into loginservice');
        const logindetails = req.body;
        signindao.logindao(logindetails, (response) => {
            callback(response)
            logger.info('Exit from loginservice');

        });
    }

    public logoutservice(req: Request, callback) {
        logger.info('Enter into logoutservice');

        const user = req.body.id;
        signindao.logoutdao(user, (response) => {
            callback(response);
            logger.info('Exit from logoutservice');

        })
    }

    public googleservice(req: Request, callback) {
        logger.info('Enter into googleservice');

        const googledata = req.body;
        signindao.googledao(googledata, (response) => {
            callback(response);
            logger.info('Exit from googleservice');

        })
    }

    public getalluserservice(req: Request, callback) {
        logger.info('Enter into getalluserservice');

        signindao.getalluserdao((response) => {
            callback(response);
            logger.info('Exit from getalluserservice');

        })
    }

    public getbyiduserservice(req: Request, callback) {
        logger.info('Enter into getbyiduserservice');

        const userId = req.params.id;
        signindao.getbyiduserdao(userId, (response) => {

            callback(response);
            logger.info('Exit from getbyiduserservice');

        })
    }

    public getrolesservice(req: Request, callback) {

        logger.info('Enter into getrolesservice');

        signindao.getrolesdao((response) => {
            callback(response);
            logger.info('Exit from getrolesservice');

        })
    }

    public updateuserservice(req: Request, callback) {
        logger.info('Enter into updateuserservice');

        const userdetails = req.body;

        signindao.updateuserdao(userdetails, (response) => {
            callback(response);
            logger.info('Exit from updateuserservice');

        })
    }
}