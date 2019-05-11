import { Request } from 'mongoose';

import { Loginmanagerservice } from '../apiservices/index';

export class Adminservice {

    private loginservice = new Loginmanagerservice();

    public admin(req:Request, callback: CallableFunction){
        this.loginservice.getallUser((response) => {
            callback(response.body);
        })
    }

    public admingetuser(req:Request, callback:CallableFunction){
        const id = req.params.id
        this.loginservice.getuserbyid(id,(response)=>{
            callback(response.body);
        })
    }

    public admingetroles(req:Request,callback:CallableFunction){

        this.loginservice.getallroles((response)=>{
            callback(response.body);
        })
    }

    public adminupdateuser(req:Request, callback:CallableFunction){

        const userdetails = req.body;

        this.loginservice.Updateuser(userdetails,(response)=>{
            callback(response.body);
        })
    }
}