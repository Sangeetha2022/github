export class SharedService {

    //local
    // public static generatorBaseUrl = "http://localhost";
    // public static systementryBaseUrl = "http://localhost";


    //kubernetes
    public static generatorBaseUrl = "http://gep-stage-generator.gep-stage-201908.svc.cluster.local";
    public static systementryBaseUrl = "http://gep-stage-system-entry.gep-stage-201908.svc.cluster.local";

    public static apiGatewayURL: String = SharedService.systementryBaseUrl + ":3000";

    public static adminmanager: String = SharedService.generatorBaseUrl + ":5018";

}