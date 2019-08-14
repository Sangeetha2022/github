import { Request } from 'express';
import { ConsentDao } from '../daos/ConsentDao';
const logger = require('../config/Logger');

let consentdao = new ConsentDao();

export class Consentservice {
    public consentservice(req: Request, callback) {
        logger.info('Enter into consentservice');
        const consentbody = req.body;
        consentdao.consentdao(consentbody, (response) => {
            callback(response);
            logger.info('Exit from Consentcontroller');
        });

    }

}
