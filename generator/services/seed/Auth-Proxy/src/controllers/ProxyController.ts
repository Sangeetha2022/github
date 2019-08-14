import { Request, Response, NextFunction } from 'express';
import { Proxyservice } from '../services/Proxyservice';
const logger = require('../config/Logger');

let proxyservice = new Proxyservice;

export class Proxycontroller {

    public usercontroller(req: Request, res: Response) {
        logger.info('Enter into usercontroller');
        var userdetails = req.body;
        proxyservice.userservice(userdetails, (response) => {
            res.status(200);
            res.json(response);
            logger.info('Exit from usercontroller');
        })
    }
}