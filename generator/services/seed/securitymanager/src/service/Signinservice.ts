import { Request, response } from 'express';
import { SigninDao } from '../daos/SigninDao';
const logger = require('../config/Logger');

let signindao = new SigninDao();
export class Signinservice {

    public signupservice(req: Request, callback) {
        logger.info('Signinservice.ts : signupservice');
        const users = req.body;
        signindao.signindao(users, (response) => {
            callback(response);
        });
    }

    public loginservice(req: Request, callback) {
        logger.info('Signinservice.ts : loginservice');
        const logindetails = req.body;
        signindao.logindao(logindetails, (response) => {
            callback(response)
        });
    }

    public logoutservice(req: Request, callback) {
        const user = req.body.id;
        signindao.logoutdao(user, (response) => {
            callback(response);
        })
    }

    public googleservice(req: Request, callback) {
        const googledata = req.body;
        signindao.googledao(googledata, (response) => {
            callback(response);
        })
    }

    public getalluserservice(req: Request, callback) {
        signindao.getalluserdao((response) => {
            callback(response);
        })
    }

    public getbyiduserservice(req: Request, callback) {
        const userId = req.params.id;
        signindao.getbyiduserdao(userId, (response) => {
            callback(response);
        })
    }

    public getrolesservice(req: Request, callback) {

        signindao.getrolesdao((response) => {
            callback(response);
        })
    }

    public updateuserservice(req: Request, callback) {
        const userdetails = req.body;

        signindao.updateuserdao(userdetails, (response) => {
            callback(response);
        })
    }
}