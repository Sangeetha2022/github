
export class SharedService {

    //local
    public static baseUrl = "http://localhost";

    //kubernetes
    // public static baseUrl = "http://gep-dev-generator.gep-dev-201902.svc.cluster.local";



    public static apiGatewayURL: String = SharedService.baseUrl + ":3000";
    public static authURL: String = SharedService.baseUrl + ":5017";
}