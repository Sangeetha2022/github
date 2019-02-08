import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
    // public projbaseUrl: string = "http://localhost:3003";
    // public flowbaseUrl: string = "http://localhost:3001";
    // public mflowbaseUrl: string = "http://localhost:3002";

    public projbaseUrl: string = "http://a47120c772bc811e99f1a12c401c6936-1274533402.us-east-1.elb.amazonaws.com:3003";
    public flowbaseUrl: string = "http://a47120c772bc811e99f1a12c401c6936-1274533402.us-east-1.elb.amazonaws.com:3001";
    public mflowbaseUrl: string = "http://a47120c772bc811e99f1a12c401c6936-1274533402.us-east-1.elb.amazonaws.com:3002";
    // public screenbaseUrl: string = "http://localhost";
    public browser_language: string;
}