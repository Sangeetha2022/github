import { Request, Response, response } from 'express';
import { Signinservice } from '../service/Signinservice';
const logger = require('../config/Logger');

let signinservice = new Signinservice;
export class Signincontroller {

    public signup(req: Request, res: Response) {
        logger.info('Enter into Signincontrollers.ts: signup');
        signinservice.signupservice(req, (response) => {
            res.status(201);
            res.json(response);
            logger.info('Exit from Signincontrollers.ts: signup');
        })
    }

    public login(req: Request, res: Response) {
        logger.info('Enter into Signincontrollers.ts: login');
        signinservice.loginservice(req, (response) => {
            res.status(200);
            res.json(response);
            logger.info('Exit from Signincontrollers.ts: login');

        })

    }

    public logout(req: Request, res: Response) {
        logger.info('Enter into Signincontrollers.ts: logout');

        signinservice.logoutservice(req, (response) => {
            res.status(200);
            res.json(response);
            logger.info('Exit from Signincontrollers.ts: logout');

        })
    }

    public googlecontroller(req: Request, res: Response) {
        logger.info('Enter into Signincontrollers.ts: googlecontroller');

        signinservice.googleservice(req, (response) => {
            res.status(200);
            res.json(response);
            logger.info('Exit from Signincontrollers.ts: googlecontroller');

        })
    }

    public getallusers(req: Request, res: Response) {
        logger.info('Enter into Signincontrollers.ts: getallusers');

        signinservice.getalluserservice(req, (response) => {
            res.status(200);
            res.json(response);
            logger.info('Exit from Signincontrollers.ts: getallusers');

        });
    }

    public getuserbyid(req: Request, res: Response) {
        logger.info('Enter into Signincontrollers.ts: getuserbyid');

        signinservice.getbyiduserservice(req, (response) => {
            res.status(200);
            res.json(response);
            logger.info('Exit from Signincontrollers.ts: getuserbyid');

        })
    }

    public getallroles(req: Request, res: Response) {
        logger.info('Enter into Signincontrollers.ts: getallroles');

        signinservice.getrolesservice(req, (response) => {
            res.status(200);
            res.json(response);
            logger.info('Exit from Signincontrollers.ts: getallroles');

        })
    }

    public updateuser(req: Request, res: Response) {
        logger.info('Enter into Signincontrollers.ts: updateuser');

        signinservice.updateuserservice(req, (response) => {
            res.status(200);
            res.json(response);
            logger.info('Exit from Signincontrollers.ts: updateuser');

        })
    }

}