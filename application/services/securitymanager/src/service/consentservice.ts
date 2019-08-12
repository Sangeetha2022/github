import { Request } from 'express';
import { ConsentDao } from '../daos/ConsentDao';
const logger = require('../config/Logger');

let consentdao = new ConsentDao();

export class Consentservice {
    public consentservice(req: Request, callback) {
        logger.info('consentservice.ts : consentservice');
        const consentbody = req.body;
        consentdao.consentdao(consentbody, (response) => {
            callback(response);
        });

    }

}
