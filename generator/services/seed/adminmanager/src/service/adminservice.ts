import { Request } from 'mongoose';

import { Loginmanagerservice } from '../apiservices/index';
const logger = require('../config/Logger');

export class Adminservice {

    private loginservice = new Loginmanagerservice();

    public admin(req:Request, callback: CallableFunction){
        logger.info('Enter into adminservice.ts: admin');

        this.loginservice.getallUser((response) => {
            callback(response.body);
        logger.info('Exit from admin');

        })
    }

    public admingetuser(req:Request, callback:CallableFunction){
        logger.info('Enter into adminservice.ts: admingetuser');

        const id = req.params.id
        this.loginservice.getuserbyid(id,(response)=>{
            callback(response.body);
        logger.info('Exit from adminservice.ts: admingetuser');

        })
    }

    public admingetroles(req:Request,callback:CallableFunction){
        logger.info('Enter into adminservice.ts: admingetroles');

        this.loginservice.getallroles((response)=>{
            callback(response.body);
        logger.info('Exit from adminservice.ts: admingetroles');

        })
    }

    public adminupdateuser(req:Request, callback:CallableFunction){
        logger.info('Enter into adminservice.ts: adminupdateuser');

        const userdetails = req.body;

        this.loginservice.Updateuser(userdetails,(response)=>{
            callback(response.body);
        logger.info('Exit from adminservice.ts: adminupdateuser');

        })
    }
}