import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
    public flowbaseUrl: String = 'http://localhost:3001';
    public mflowbaseUrl: String = 'http://localhost:3002';
    public projbaseUrl: String = 'http://localhost:3003';
    public screenUrl: String = 'http://localhost:3004';
    public entityUrl: String = 'http://localhost:3005';
    public featureUrl: String = 'http://localhost:3006';
    public configUrl: String = 'http://localhost:5001'


    // public flowbaseUrl: string = "http://a1ff91813313a11e99f1a12c401c6936-1399345860.us-east-1.elb.amazonaws.com:3001";
    // public mflowbaseUrl: string = "http://a1ff91813313a11e99f1a12c401c6936-1399345860.us-east-1.elb.amazonaws.com:3002";
    // public projbaseUrl: string = "http://a1ff91813313a11e99f1a12c401c6936-1399345860.us-east-1.elb.amazonaws.com:3003";
    // public screenUrl: string = "http://a1ff91813313a11e99f1a12c401c6936-1399345860.us-east-1.elb.amazonaws.com:3004";
    // public entityUrl: string = "http://a1ff91813313a11e99f1a12c401c6936-1399345860.us-east-1.elb.amazonaws.com:3005";
    public genmanagerUrl: String = 'http://localhost:5000';

    public browser_language: string;
}
