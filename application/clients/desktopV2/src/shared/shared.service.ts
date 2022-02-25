
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class SharedService {

    // base host
    public static BaseHost = environment.BaseHost;
    public static UploadHost = environment.UploadHost;

    private envPort = environment.Port;
    private uploadPort = environment.uploadPort;

    // App Service
   public Apigateway: String = SharedService.BaseHost + this.envPort;
   //public Apigateway: String = "https://dev-v2api.geppettosoftware.com";
   public Gepfileupload: String = SharedService.UploadHost + this.uploadPort;

    message:string='';
    setMessage(data:any){
this.message=data;
    }
    getMessage(){
        return this.message;
    }

}
