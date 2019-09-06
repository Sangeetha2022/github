import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {

    // base host
    public static BaseHost = 'http://' + window.location.hostname;

    // Local
    // public loginUrl: String = SharedService.BaseHost+':3007';
    // public Apigateway: String = SharedService.BaseHost+':3000';
    // public Adminmanager: String = SharedService.BaseHost+':3010';
    // public flowbaseUrl: String = SharedService.BaseHost+':3001';
    // public mflowbaseUrl: String = SharedService.BaseHost+':3002';
    // public projbaseUrl: String = SharedService.BaseHost+':3003';
    // public screenUrl: String = SharedService.BaseHost+':3004';
    // public entityUrl: String = SharedService.BaseHost+':3005';
    // public featureUrl: String = SharedService.BaseHost+':3006';
    // public menuUrl: String = SharedService.BaseHost+':3011';
    // public templateUrl: String = SharedService.BaseHost+':3012';
    // public configUrl: String = SharedService.BaseHost+':5001';
    // public featureflowbaseUrl: String = SharedService.BaseHost+':3011';
    // public genmanagerUrl: String = SharedService.BaseHost+':5000';


    // App Service
    public Apigateway: String = SharedService.BaseHost + ':30000';
    public projbaseUrl: String = SharedService.BaseHost + ':30003';
    public screenUrl: String = SharedService.BaseHost + ':30004';
    // public featureUrl: String = SharedService.BaseHost+':30006';
    public loginUrl: String = SharedService.BaseHost + ':30007';
    public Adminmanager: String = SharedService.BaseHost + ':30010';
    public menuUrl: String = SharedService.BaseHost + ':30011';
    public templateUrl: String = SharedService.BaseHost + ':30012';

    // // Generator Services
    public genmanagerUrl: String = SharedService.BaseHost + ':30500';
    public configUrl: String = SharedService.BaseHost + ':30501';

    public browser_language: String;

}





