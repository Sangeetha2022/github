export class SharedService {

    //local
    // public static generatorBaseUrl = "http://localhost";
    // public static systementryBaseUrl = "http://localhost";


    //kubernetes
    // public static generatorBaseUrl = "http://gep-dev-generator.gep-dev-201902.svc.cluster.local";
    // public static systementryBaseUrl = "http://gep-dev-system-entry.gep-dev-201902.svc.cluster.local";
    // public static apiGatewayURL: String = SharedService.systementryBaseUrl + ":3000";
    // public static adminmanager: String = SharedService.generatorBaseUrl + ":5018";


    public static generatorBaseUrl: String;
    public static systementryBaseUrl: String;
    public static apiGatewayURL: String;
    public static adminmanager: String;


    constructor() {
        this.getURL();
    }


    public getURL() {

        switch (process.env.localname) {

            case process.env.name: SharedService.systementryBaseUrl = process.env.localsystementryBaseUrl;
                // SharedService.generatorBaseUrl = process.env.localgeneratorBaseUrl;
                SharedService.generatorBaseUrl = process.env.localgeneratorBaseUrl;
                SharedService.apiGatewayURL = SharedService.systementryBaseUrl + ":3000";
                break;

            default: SharedService.systementryBaseUrl = process.env.livesystementryBaseUrl;
                SharedService.generatorBaseUrl = process.env.livegeneratorBaseUrl;
                SharedService.apiGatewayURL = SharedService.systementryBaseUrl + ":3000";
                break;
        }

    }


}