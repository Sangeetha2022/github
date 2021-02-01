export class SharedService {

    //local
    // public static systementryBaseUrl = "http://localhost";

    //kubernetes
    // public static systementryBaseUrl = "http://gep-dev-system-entry.gep-dev-201902.svc.cluster.local";
    // public static apiGatewayURL: String = SharedService.systementryBaseUrl + ":3000";

    public static systementryBaseUrl :string ;
    public static apiGatewayURL: String;
    public static aws_deploymentURL: String;

    constructor() {
        this.getURL();
    }

    public getURL() {

        switch (process.env.localname) {

            case process.env.name: SharedService.systementryBaseUrl = process.env.localsystementryBaseUrl;
                SharedService.apiGatewayURL = SharedService.systementryBaseUrl + ":3000";
                SharedService.aws_deploymentURL = process.env.awsdeploymentmanager + ":5021";

                break;

            default: SharedService.systementryBaseUrl = process.env.livesystementryBaseUrl;
                SharedService.apiGatewayURL = SharedService.systementryBaseUrl + ":3000";
                SharedService.aws_deploymentURL = process.env.awsdeploymentmanager  + ":5021";

                break;
        }

    }

}