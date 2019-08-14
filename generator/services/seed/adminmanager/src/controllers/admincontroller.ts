import { Request, Response } from 'mongoose';
import { Adminservice } from '../service/adminservice';
const logger = require('../config/Logger');

let adminservice = new Adminservice();
export class AdminController {


    public adminuser(req: Request, res: Response) {
        logger.info('Enter into admincontroller.ts: adminuser');
        adminservice.admin(req, (response) => {
            res.status(200);
            res.json(response);
            logger.info('Exit from admincontroller.ts: adminuser');
        })
    }

    public getuser(req: Request, res: Response) {
        logger.info('Enter into admincontroller.ts: getuser');

        adminservice.admingetuser(req, (response) => {
            res.status(200);
            res.json(response);
            logger.info('Exit from admincontroller.ts: getuser');

        })
    }

    public getroles(req: Request, res: Response) {
        logger.info('Enter into admincontroller.ts: getroles');

        adminservice.admingetroles(req, (response) => {
            res.status(200);
            res.json(response);
            logger.info('Exit from admincontroller.ts: getroles');

        })
    }

    public updateuser(req: Request, res: Response) {
        logger.info('Enter into admincontroller.ts: updateuser');

        adminservice.adminupdateuser(req, (response) => {
            res.status(200);
            res.json(response);
            logger.info('Exit from admincontroller.ts: updateuser');

        })
    }
}