
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class SharedService {

    // base host
    public static BaseHost = environment.BaseHost;

    private envPort = environment.Port;

    // App Service
   public Apigateway: String = SharedService.BaseHost + this.envPort;
   //public Apigateway: String = "https://dev-v2api.geppettosoftware.com";

    message:string='';
    setMessage(data:any){
this.message=data;
    }
    getMessage(){
        return this.message;
    }

}
