
export class SharedService {
    // public static apiGatewayURL: String = `http://localhost:3000`;
    public static systementryBaseUrl = "http://gep-stage-system-entry.gep-stage-201908.svc.cluster.local";

    public static apiGatewayURL: String = SharedService.systementryBaseUrl + ":3000";
}