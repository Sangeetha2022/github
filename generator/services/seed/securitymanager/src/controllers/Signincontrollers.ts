import { Request, Response, response } from 'express';
import { Signinservice } from '../service/Signinservice';
const logger = require('../config/Logger');

let signinservice = new Signinservice;
export class Signincontroller {

    public signup(req: Request, res: Response) {
        logger.info('Enter into signup');
        signinservice.signupservice(req, (response) => {
            res.status(201);
            res.json(response);
            logger.info('Exit from signup');
        })
    }

    public login(req: Request, res: Response) {
        logger.info('Enter into login');
        signinservice.loginservice(req, (response) => {
            res.status(200);
            res.json(response);
            logger.info('Exit from login');

        })

    }

    public logout(req: Request, res: Response) {
        logger.info('Enter into logout');

        signinservice.logoutservice(req, (response) => {
            res.status(200);
            res.json(response);
            logger.info('Exit from logout');

        })
    }

    public googlecontroller(req: Request, res: Response) {
        logger.info('Enter into googlecontroller');

        signinservice.googleservice(req, (response) => {
            res.status(200);
            res.json(response);
            logger.info('Exit from googlecontroller');

        })
    }

    public getallusers(req: Request, res: Response) {
        logger.info('Enter into getallusers');

        signinservice.getalluserservice(req, (response) => {
            res.status(200);
            res.json(response);
            logger.info('Exit from getallusers');

        });
    }

    public getuserbyid(req: Request, res: Response) {
        logger.info('Enter into getuserbyid');

        signinservice.getbyiduserservice(req, (response) => {
            res.status(200);
            res.json(response);
            logger.info('Exit from getuserbyid');

        })
    }

    public getallroles(req: Request, res: Response) {
        logger.info('Enter into getallroles');

        signinservice.getrolesservice(req, (response) => {
            res.status(200);
            res.json(response);
            logger.info('Exit from getallroles');

        })
    }

    public updateuser(req: Request, res: Response) {
        logger.info('Enter into updateuser');

        signinservice.updateuserservice(req, (response) => {
            res.status(200);
            res.json(response);
            logger.info('Exit from updateuser');

        })
    }

}