import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
    // Local
    // public loginUrl: String = 'http://localhost:3008';
    // public Apigateway: String = 'http://localhost:3010';
    // public flowbaseUrl: String = 'http://localhost:3001';
    // public mflowbaseUrl: String = 'http://localhost:3002';
    // public projbaseUrl: String = 'http://localhost:3003';
    // public screenUrl: String = 'http://localhost:3004';
    // public entityUrl: String = 'http://localhost:3005';
    // public featureUrl: String = 'http://localhost:3006';
    // public configUrl: String = 'http://localhost:5001';
    // public featureflowbaseUrl: String = 'http://localhost:3011';
    // public genmanagerUrl: String = 'http://localhost:5000';

// App Service
public Apigateway: String = 'http://3.92.72.204:30001';
public flowbaseUrl: String = 'http://a1b92b727579811e9a0f9123b38b3f44-375396789.us-east-1.elb.amazonaws.com:3001';
public mflowbaseUrl: String = 'http://a1b92b727579811e9a0f9123b38b3f44-375396789.us-east-1.elb.amazonaws.com:3002';
public projbaseUrl: String = 'http://a1b92b727579811e9a0f9123b38b3f44-375396789.us-east-1.elb.amazonaws.com:3003';
public screenUrl: String = 'http://a1b92b727579811e9a0f9123b38b3f44-375396789.us-east-1.elb.amazonaws.com:3004';
public entityUrl: String = 'http://a1b92b727579811e9a0f9123b38b3f44-375396789.us-east-1.elb.amazonaws.com:3005';
public featureUrl: String = 'http://a1b92b727579811e9a0f9123b38b3f44-375396789.us-east-1.elb.amazonaws.com:3006';
public featureflowbaseUrl: String = 'http://a1b92b727579811e9a0f9123b38b3f44-375396789.us-east-1.elb.amazonaws.com:3007';
public loginUrl: String = 'http://a1b92b727579811e9a0f9123b38b3f44-375396789.us-east-1.elb.amazonaws.com:3008';

// Generator Services
public genmanagerUrl: String = 'http://ac769f28b521b11e988250eeb40aab9c-41146344.us-east-1.elb.amazonaws.com:5000';
public configUrl: String = 'http://ac769f28b521b11e988250eeb40aab9c-41146344.us-east-1.elb.amazonaws.com:5001';

public browser_language: String;
}
