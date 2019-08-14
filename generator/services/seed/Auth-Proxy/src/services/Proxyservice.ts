import { Request, Response, NextFunction } from 'express';
import { Proxydao } from '../dao/Proxydao';
const logger = require('../config/Logger');

let proxydao = new Proxydao;

export class Proxyservice {

    public userservice(userdetails, callback) {
        logger.info('Enter into Proxyservice.ts: userservice');
        proxydao.userdao(userdetails, (response) => {
            callback(response);
            logger.info('Exit from Proxyservice.ts: userservice');
        })
    }
}
