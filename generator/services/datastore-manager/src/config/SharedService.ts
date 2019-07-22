
export class SharedService {

    //local
    // public static baseUrl = "http://localhost";

    //kubernetes
    public static baseUrl = "http://gep-dev-system-entry.gep-dev-201902.svc.cluster.local";



    public static apiGatewayURL: String = SharedService.baseUrl + ":3000";
}