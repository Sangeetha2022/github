import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
    public flowbaseUrl: String = 'http://localhost:3001';
    public mflowbaseUrl: String = 'http://localhost:3002';
    public projbaseUrl: String = 'http://localhost:3003';
    public screenUrl: String = 'http://localhost:3004';
    public entityUrl: String = 'http://localhost:3005';

    public genmanagerUrl: String = 'http://localhost:5000';

    // public projbaseUrl: string = "http://a47120c772bc811e99f1a12c401c6936-1274533402.us-east-1.elb.amazonaws.com:3003";
    // public flowbaseUrl: string = "http://a47120c772bc811e99f1a12c401c6936-1274533402.us-east-1.elb.amazonaws.com:3001";
    // public mflowbaseUrl: string = "http://a47120c772bc811e99f1a12c401c6936-1274533402.us-east-1.elb.amazonaws.com:3002";
    // public screenUrl: string = "http://localhost";
    public browser_language: string;
}
