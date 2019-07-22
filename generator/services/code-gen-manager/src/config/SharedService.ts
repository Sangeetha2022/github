
export class SharedService {

    //local
    // public static baseUrl = "http://localhost";
    // public static apibaseUrl = "http://localhost";

    //kubernetes
    public static baseUrl = "http://gep-dev-generator.gep-dev-201902.svc.cluster.local";
    public static apibaseUrl = "http://gep-dev-system-entry.gep-dev-201902.svc.cluster.local";



    public static apiGatewayURL: String = SharedService.apibaseUrl + ":3000";
    public static backendmanagerURL: String = SharedService.baseUrl + ":5009";

}