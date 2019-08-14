import { Request } from 'mongoose';

import { Loginmanagerservice } from '../apiservices/index';
const logger = require('../config/Logger');

export class Adminservice {

    private loginservice = new Loginmanagerservice();

    public admin(req:Request, callback: CallableFunction){
        logger.info('Enter into admin');

        this.loginservice.getallUser((response) => {
            callback(response.body);
        logger.info('Exit from admin');

        })
    }

    public admingetuser(req:Request, callback:CallableFunction){
        logger.info('Enter into admingetuser');

        const id = req.params.id
        this.loginservice.getuserbyid(id,(response)=>{
            callback(response.body);
        logger.info('Exit from admingetuser');

        })
    }

    public admingetroles(req:Request,callback:CallableFunction){
        logger.info('Enter into admingetroles');

        this.loginservice.getallroles((response)=>{
            callback(response.body);
        logger.info('Exit from admingetroles');

        })
    }

    public adminupdateuser(req:Request, callback:CallableFunction){
        logger.info('Enter into adminupdateuser');

        const userdetails = req.body;

        this.loginservice.Updateuser(userdetails,(response)=>{
            callback(response.body);
        logger.info('Exit from adminupdateuser');

        })
    }
}