export class SharedService {

    //local
    // public static systementryBaseUrl = "http://localhost";
    // public static generatorBaseUrl = "http://localhost";

    //kubernetes
    public static systementryBaseUrl = "http://gep-stage-system-entry.gep-stage-201908.svc.cluster.local";
    public static generatorBaseUrl = "http://gep-stage-generator.gep-stage-201908.svc.cluster.local";

    public static apiGatewayURL: String = SharedService.systementryBaseUrl + ":3000";
    public static authURL: String = SharedService.generatorBaseUrl + ":5017";
    public static adminURL: String = SharedService.generatorBaseUrl + ":5018";
    public static ionicURL: String = SharedService.generatorBaseUrl + ":5019";
    public static systembaseurl: String = SharedService.generatorBaseUrl + ":5003";
}