export class SharedService {

    //local
    // public static generatorBaseUrl = "http://localhost";
    // public static systementryBaseUrl = "http://localhost";


    //kubernetes
    public static generatorBaseUrl = "http://gep-dev-generator.gep-dev-201902.svc.cluster.local";
    public static systementryBaseUrl = "http://gep-dev-system-entry.gep-dev-201902.svc.cluster.local";



    public static apiGatewayURL: String = SharedService.systementryBaseUrl + ":3000";

    public static backendmanagerURL: String = SharedService.generatorBaseUrl + ":5009";

}