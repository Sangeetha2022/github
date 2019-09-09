export class SharedService {

    //local
    // public static systementryBaseUrl = "http://localhost";

    //kubernetes
    public static systementryBaseUrl = "http://gep-stage-system-entry.gep-stage-201908.svc.cluster.local";

    public static apiGatewayURL: String = SharedService.systementryBaseUrl + ":3000";

}