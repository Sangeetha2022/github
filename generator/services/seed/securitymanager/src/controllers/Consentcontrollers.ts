import { Request, Response } from 'express';
import { Consentservice } from '../service/consentservice';
const logger = require('../config/Logger');

let consentservice = new Consentservice;

export class Consentcontroller {
    public consent(req: Request, res: Response) {
        logger.info('Enter into Consentcontrollers.ts: Consentcontroller');

        consentservice.consentservice(req, (response) => {
            res.status(201);
            res.json(response);
            logger.info('Exit from Consentcontrollers.ts: Consentcontroller');
        })
    }
}

