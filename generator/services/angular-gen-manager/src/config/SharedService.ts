
export class SharedService {

    // local
    public static systementryBaseUrl = "http://localhost";

    // Kubernetes
    // public static systementryBaseUrl = "http://gep-dev-system-entry.gep-dev-201902.svc.cluster.local";

    public static apiGatewayURL: String = SharedService.systementryBaseUrl + ":3000";
}