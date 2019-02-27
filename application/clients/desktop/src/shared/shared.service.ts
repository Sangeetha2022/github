import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
    public flowbaseUrl: String = 'http://localhost:3001';
    // public mflowbaseUrl: String = 'http://localhost:3002';
    // public projbaseUrl: String = 'http://localhost:3003';
    // public screenUrl: String = 'http://localhost:3004';
    // public entityUrl: String = 'http://localhost:3005';
    // public featureUrl: String = 'http://localhost:3006';
    public configUrl: String = 'http://localhost:5001'


    // public flowbaseUrl: string = "http://a7b1cb70c352e11e99f1a12c401c6936-2100707124.us-east-1.elb.amazonaws.com:3001";
    public mflowbaseUrl: string = "http://a7b1cb70c352e11e99f1a12c401c6936-2100707124.us-east-1.elb.amazonaws.com:3002";
    public projbaseUrl: string = "http://a7b1cb70c352e11e99f1a12c401c6936-2100707124.us-east-1.elb.amazonaws.com:3003";
    public screenUrl: string = "http://a7b1cb70c352e11e99f1a12c401c6936-2100707124.us-east-1.elb.amazonaws.com:3004";
    public entityUrl: string = "http://a7b1cb70c352e11e99f1a12c401c6936-2100707124.us-east-1.elb.amazonaws.com:3005";
    public featureUrl: string = "http://a7b1cb70c352e11e99f1a12c401c6936-2100707124.us-east-1.elb.amazonaws.com:3006";
    public genmanagerUrl: String = 'http://a31267f0a336411e982c60202a46ed6d-350417463.us-east-1.elb.amazonaws.com:5000';

    public browser_language: string;
}
