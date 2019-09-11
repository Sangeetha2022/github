import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {

    // base host
    public static BaseHost = 'http://' + window.location.hostname;

    // App Service
    public Apigateway: String = SharedService.BaseHost + ':30000';
}
