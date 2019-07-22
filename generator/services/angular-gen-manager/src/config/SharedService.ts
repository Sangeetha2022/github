
export class SharedService {

    // local
    // public static systementryBaseUrl = "http://localhost";

    // Kubernetes
    public static baseUrl = "http://gep-dev-system-entry.gep-dev-201902.svc.cluster.local";

    public static apiGatewayURL: String = SharedService.baseUrl + ":3000";
}