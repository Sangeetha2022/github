import { Request } from 'express';
import { SigninDao } from '../daos/SigninDao';

let signindao = new SigninDao();
export class Signinservice {

    public signupservice(req: Request, callback) {
        const users = req.body;
        signindao.signindao(users, (response) => {
            callback(response);
        });
    }

    public loginservice(req: Request, callback) {
        const logindetails = req.body;
        signindao.logindao(logindetails, (response) => {
            callback(response)
        });
    }

    public logoutservice(req: Request, callback) {
        const user = req.body;
        signindao.logoutdao(user.userid, (response) => {
            callback(response);
        })
    }
}