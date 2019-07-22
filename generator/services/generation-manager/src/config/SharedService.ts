
export class SharedService {

    //local
    // public static baseUrl = "http://localhost";
    // public static systementryBaseUrl = "http://localhost";


    //kubernetes
    public static systementryBaseUrl = "http://gep-dev-system-entry.gep-dev-201902.svc.cluster.local";
    public static baseUrl = "http://gep-dev-generator.gep-dev-201902.svc.cluster.local";



    public static apiGatewayURL: String = SharedService.systementryBaseUrl + ":3000";

    public static infrastructureURL: String = SharedService.baseUrl + ":5004";

}