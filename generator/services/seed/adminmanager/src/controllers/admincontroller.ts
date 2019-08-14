import { Request, Response } from 'mongoose';
import { Adminservice } from '../service/adminservice';
const logger = require('../config/Logger');

let adminservice = new Adminservice();
export class AdminController {


    public adminuser(req: Request, res: Response) {
        logger.info('Enter into adminuser');
        adminservice.admin(req, (response) => {
            res.status(200);
            res.json(response);
            logger.info('Exit from adminuser');
        })
    }

    public getuser(req: Request, res: Response) {
        logger.info('Enter into getuser');

        adminservice.admingetuser(req, (response) => {
            res.status(200);
            res.json(response);
            logger.info('Exit from getuser');

        })
    }

    public getroles(req: Request, res: Response) {
        logger.info('Enter into getroles');

        adminservice.admingetroles(req, (response) => {
            res.status(200);
            res.json(response);
            logger.info('Exit from getroles');

        })
    }

    public updateuser(req: Request, res: Response) {
        logger.info('Enter into updateuser');

        adminservice.adminupdateuser(req, (response) => {
            res.status(200);
            res.json(response);
            logger.info('Exit from updateuser');

        })
    }
}