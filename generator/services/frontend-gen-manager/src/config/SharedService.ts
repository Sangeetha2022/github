export class SharedService {

    //local
    // public static systementryBaseUrl = "http://localhost";
    // public static generatorBaseUrl = "http://localhost";

    //kubernetes
    // public static systementryBaseUrl = "http://gep-dev-system-entry.gep-dev-201902.svc.cluster.local";
    // public static generatorBaseUrl = "http://gep-dev-generator.gep-dev-201902.svc.cluster.local";

    // public static apiGatewayURL: String = SharedService.systementryBaseUrl + ":3000";
    // public static authURL: String = SharedService.generatorBaseUrl + ":5017";
    // public static adminURL: String = SharedService.generatorBaseUrl + ":5018";
    // public static ionicURL: String = SharedService.generatorBaseUrl + ":5019";
    // public static systembaseurl: String = SharedService.generatorBaseUrl + ":5003";

     public static generatorBaseUrl : String;
     public static systementryBaseUrl : String ;
     public static apiGatewayURL: String ;
     public static authURL: String ;
     public static adminURL: String ;
     public static ionicURL: String ;
     public static systembaseurl: String ;
  
      
     constructor(){
        this.getURL();
    }


 public getURL(){

        switch (process.env.localname) {

    case process.env.name :   SharedService.systementryBaseUrl = process.env.localsystementryBaseUrl;
                              SharedService.generatorBaseUrl = process.env.localgeneratorBaseUrl;
                              SharedService.apiGatewayURL = SharedService.systementryBaseUrl + ":3000";
                              SharedService.authURL =  process.env.authgenmanager + ":5017";
                              SharedService.adminURL =  process.env.admingenmanager + ":5018";
                              SharedService.ionicURL =  process.env.ionicmanager + ":5019";
                              SharedService.systembaseurl =  process.env.screengenmanager  + ":5003";

   
        break;

    default:               SharedService.systementryBaseUrl = process.env.livesystementryBaseUrl ;
                           SharedService.generatorBaseUrl = process.env.livegeneratorBaseUrl ;
                           SharedService.apiGatewayURL = SharedService.systementryBaseUrl + ":3000";
                           SharedService.authURL =  SharedService.generatorBaseUrl + ":5017";
                           SharedService.adminURL =  SharedService.generatorBaseUrl + ":5018";
                           SharedService.ionicURL =  SharedService.generatorBaseUrl + ":5019";
                           SharedService.systembaseurl =  SharedService.generatorBaseUrl + ":5003";
    
        break;
      }

    }
}