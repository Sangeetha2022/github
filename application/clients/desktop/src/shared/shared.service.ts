import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {


    public loginUrl: String = 'http://localhost:3007';
    public flowbaseUrl: String = 'http://localhost:3001';

    // public flowbaseUrl: String = 'http://localhost:3001';
    // public mflowbaseUrl: String = 'http://localhost:3002';
    // public projbaseUrl: String = 'http://localhost:3003';
    // public screenUrl: String = 'http://localhost:3004';
    // public entityUrl: String = 'http://localhost:3005';
    // public featureUrl: String = 'http://localhost:3006';
    // public configUrl: String = 'http://localhost:5001'

    public mflowbaseUrl: String = 'http://localhost:3002';
    public projbaseUrl: String = 'http://localhost:3003';
    public screenUrl: String = 'http://localhost:3004';
    public entityUrl: String = 'http://localhost:3005';
    public featureUrl: String = 'http://localhost:3006';
    public featureflowbaseUrl: String = 'http://localhost:3007';
    public configUrl: String = 'http://localhost:5001';
    public genmanagerUrl: String = 'http://localhost:5000';



    // public flowbaseUrl: String = "http://afa7c098d4afc11e988250eeb40aab9c-613839645.us-east-1.elb.amazonaws.com:3001";
    // public mflowbaseUrl: String = 'http://afa7c098d4afc11e988250eeb40aab9c-613839645.us-east-1.elb.amazonaws.com:3002';
    // public projbaseUrl: String = 'http://afa7c098d4afc11e988250eeb40aab9c-613839645.us-east-1.elb.amazonaws.com:3003';
    // public screenUrl: String = 'http://afa7c098d4afc11e988250eeb40aab9c-613839645.us-east-1.elb.amazonaws.com:3004';
    // public entityUrl: String = 'http://afa7c098d4afc11e988250eeb40aab9c-613839645.us-east-1.elb.amazonaws.com:3005';
    // public featureflowbaseUrl = 'http://afa7c098d4afc11e988250eeb40aab9c-613839645.us-east-1.elb.amazonaws.com:3007'
    // public featureUrl: String = 'http://afa7c098d4afc11e988250eeb40aab9c-613839645.us-east-1.elb.amazonaws.com:3006';
    // public genmanagerUrl: String = 'http://a14efe48e38cf11e982c60202a46ed6d-1515056916.us-east-1.elb.amazonaws.com:5000';
    // public configUrl: String = 'http://a14efe48e38cf11e982c60202a46ed6d-1515056916.us-east-1.elb.amazonaws.com:5001';

    public browser_language: String;
}
