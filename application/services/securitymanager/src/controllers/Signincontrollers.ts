import { Request, Response, response } from 'express';
import { Signinservice } from '../service/Signinservice';

let signinservice = new Signinservice;
export class Signincontroller {

    public signup(req: Request, res: Response) {

        signinservice.signupservice(req, (response) => {
            res.status(201);
            res.json(response);
        })
    }

    public login(req: Request, res: Response) {

        signinservice.loginservice(req,(response) => {
            res.status(200);
            res.json(response);
        })

    }

    public logout(req: Request, res:Response) {

        signinservice.logoutservice(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

}