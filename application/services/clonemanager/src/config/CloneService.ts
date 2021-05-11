export class CloneService {

    //local
    //public static systementryBaseUrl = "http://localhost";
    public static systementryBaseUrl = process.env.localsystementryBaseUrl;

    //kubernetes
    // public static generatorBaseUrl = "http://gep-dev-generator.gep-dev-201902.svc.cluster.local";
    // public static systementryBaseUrl = "http://gep-dev-system-entry.gep-dev-201902.svc.cluster.local";

    public static apiGatewayURL: String = CloneService.systementryBaseUrl + ":3000";


}