
export class SharedService {
    // public static apiGatewayURL: String = `http://localhost:3000`;
    public static systementryBaseUrl = "http://gep-dev-system-entry.gep-dev-201902.svc.cluster.local";

    public static apiGatewayURL: String = SharedService.systementryBaseUrl + ":3000";
}