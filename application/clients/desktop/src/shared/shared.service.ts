import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';

@Injectable()
export class SharedService {

    // base host
    public static BaseHost = 'http://' + window.location.hostname;

    private  envPort = environment.Port;
    // App Service
    public Apigateway: String = SharedService.BaseHost + this.envPort;
}
