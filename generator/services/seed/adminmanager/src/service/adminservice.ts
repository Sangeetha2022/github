import { Request } from 'mongoose';

import { Loginmanagerservice } from '../apiservices/index';
const logger = require('../config/Logger');

export class Adminservice {

    private loginservice = new Loginmanagerservice();

    public admin(req:Request, callback: CallableFunction){
        logger.info('Enter into adminservice.ts: admin');

        this.loginservice.getallUser((response) => {
            logger.info('Exit from admin');
            callback(response.body);

        })
    }

    public admingetuser(req:Request, callback:CallableFunction){
        logger.info('Enter into adminservice.ts: admingetuser');

        const id = req.params.id
        this.loginservice.getuserbyid(id,(response)=>{
            logger.info('Exit from adminservice.ts: admingetuser');
            callback(response.body);

        })
    }

    public admingetroles(req:Request,callback:CallableFunction){
        logger.info('Enter into adminservice.ts: admingetroles');

        this.loginservice.getallroles((response)=>{
            logger.info('Exit from adminservice.ts: admingetroles');
            callback(response.body);

        })
    }

    public adminupdateuser(req:Request, callback:CallableFunction){
        logger.info('Enter into adminservice.ts: adminupdateuser');

        const userdetails = req.body;

        this.loginservice.Updateuser(userdetails,(response)=>{
            logger.info('Exit from adminservice.ts: adminupdateuser');
            callback(response.body);

        })
    }
}