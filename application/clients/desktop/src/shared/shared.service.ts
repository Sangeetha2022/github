import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class SharedService {

    // base host
    public static BaseHost = environment.BaseHost;

    private envPort = environment.Port;

    //Shared microservice
    private sharedHost = 'http://localhost:3050';

    //gepfileupload
    public gepfileupload = 'http://localhost:3015';

    // ExternalFeatureconfiguration fileupload api
    public externalfeaturehost = 'http://localhost:3016';

    public externalfeatureapi: String = this.externalfeaturehost;

    // App Service
    public Apigateway: String = SharedService.BaseHost + this.envPort;
    // public Apigateway: String = 'http://localhost:3000';

    //Shared microservice
    public sharedserviceapi: String = this.sharedHost;
}
