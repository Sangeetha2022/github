import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {

// Local
public loginUrl: String = 'http://localhost:3007';
public Apigateway: String = 'http://localhost:3000';
public Adminmanager: String = 'http://localhost:3010';
public flowbaseUrl: String = 'http://localhost:3001';
public mflowbaseUrl: String = 'http://localhost:3002';
public projbaseUrl: String = 'http://localhost:3003';
public screenUrl: String = 'http://localhost:3004';
public entityUrl: String = 'http://localhost:3005';
public featureUrl: String = 'http://localhost:3006';
public menuUrl: String = 'http://localhost:3011';
public templateUrl: String = 'http://localhost:3012';
public configUrl: String = 'http://localhost:5001';
public featureflowbaseUrl: String = 'http://localhost:3011';
public genmanagerUrl: String = 'http://localhost:5000';

// App Service
// public Apigateway: String = 'http://3.84.173.148:30000';
// public flowbaseUrl: String = 'http://3.84.173.148:30001';
// public mflowbaseUrl: String = 'http://3.84.173.148:30002';
// public projbaseUrl: String = 'http://3.84.173.148:30003';
// public screenUrl: String = 'http://3.84.173.148:30004';
// public entityUrl: String = 'http://3.84.173.148:30005';
// public featureUrl: String = 'http://3.84.173.148:30006';
// public featureflowbaseUrl: String = 'http://a1b92b727579811e9a0f9123b38b3f44-375396789.us-east-1.elb.amazonaws.com:3007';
// public loginUrl: String = 'http://3.84.173.148:30007';
// public Adminmanager: String = 'http://3.84.173.148:30010';

// // Generator Services
// public genmanagerUrl: String = 'http://3.84.173.148:30500';
// public configUrl: String = 'http://3.84.173.148:30501';

public browser_language: String;
}

