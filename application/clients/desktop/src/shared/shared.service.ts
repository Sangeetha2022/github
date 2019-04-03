import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {


    // public loginUrl: String = 'http://localhost:3007';
    // public flowbaseUrl: String = 'http://localhost:3001';

    // public mflowbaseUrl: String = 'http://localhost:3002';
    // public projbaseUrl: String = 'http://localhost:3003';
    // public screenUrl: String = 'http://localhost:3004';
    // public entityUrl: String = 'http://localhost:3005';
    // public featureUrl: String = 'http://localhost:3006';
    // public configUrl: String = 'http://localhost:5001';

    // public featureflowbaseUrl: String = 'http://localhost:3007';
    // public genmanagerUrl: String = 'http://localhost:5000';


    public flowbaseUrl: String = 'http://afa7c098d4afc11e988250eeb40aab9c-613839645.us-east-1.elb.amazonaws.com:3001';
    public mflowbaseUrl: String = 'http://afa7c098d4afc11e988250eeb40aab9c-613839645.us-east-1.elb.amazonaws.com:3002';
    public projbaseUrl: String = 'http://afa7c098d4afc11e988250eeb40aab9c-613839645.us-east-1.elb.amazonaws.com:3003';
    public screenUrl: String = 'http://afa7c098d4afc11e988250eeb40aab9c-613839645.us-east-1.elb.amazonaws.com:3004';
    public entityUrl: String = 'http://afa7c098d4afc11e988250eeb40aab9c-613839645.us-east-1.elb.amazonaws.com:3005';
    public featureUrl: String = 'http://afa7c098d4afc11e988250eeb40aab9c-613839645.us-east-1.elb.amazonaws.com:3006';
    public featureflowbaseUrl = 'http://afa7c098d4afc11e988250eeb40aab9c-613839645.us-east-1.elb.amazonaws.com:3007';
    public loginUrl: String = 'http://a88c39f81506b11e9a0f9123b38b3f44-638954340.us-east-1.elb.amazonaws.com:3008';
    public genmanagerUrl: String = 'http://ac769f28b521b11e988250eeb40aab9c-41146344.us-east-1.elb.amazonaws.com:5000';
    public configUrl: String = 'http://ac769f28b521b11e988250eeb40aab9c-41146344.us-east-1.elb.amazonaws.com:5001';

    public browser_language: String;
}
