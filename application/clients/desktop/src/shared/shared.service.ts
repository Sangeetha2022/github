import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class SharedService {

    // base host
    public static BaseHost = 'http://' + window.location.hostname;

    private envPort = environment.Port;

    //Shared microservice
    private sharedHost = 'http://localhost:3050';

    // App Service
    public Apigateway: String = SharedService.BaseHost + this.envPort;
    // public Apigateway: String = 'http://localhost:3000';

    //Shared microservice
    public sharedserviceapi: String = this.sharedHost;
}
