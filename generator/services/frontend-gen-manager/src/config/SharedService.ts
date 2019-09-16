export class SharedService {

    //local
    // public static systementryBaseUrl = "http://localhost";
    // public static generatorBaseUrl = "http://localhost";

    //kubernetes
    public static systementryBaseUrl = "http://gep-dev-system-entry.gep-dev-201902.svc.cluster.local";
    public static generatorBaseUrl = "http://gep-dev-generator.gep-dev-201902.svc.cluster.local";

    public static apiGatewayURL: String = SharedService.systementryBaseUrl + ":3000";
    public static authURL: String = SharedService.generatorBaseUrl + ":5017";
    public static adminURL: String = SharedService.generatorBaseUrl + ":5018";
    public static ionicURL: String = SharedService.generatorBaseUrl + ":5019";
    public static systembaseurl: String = SharedService.generatorBaseUrl + ":5003";
}