export class SharedService {

    public static systementryBaseUrl: string;
    public static apiGatewayURL: String;

    constructor() {
        this.getURL();
    }

    public getURL() {

        switch (process.env.localname) {
            case process.env.name: SharedService.systementryBaseUrl = process.env.localsystementryBaseUrl;
                SharedService.apiGatewayURL = SharedService.systementryBaseUrl + ":3000";
                break;

            default: SharedService.systementryBaseUrl = process.env.livesystementryBaseUrl;
                SharedService.apiGatewayURL = SharedService.systementryBaseUrl + ":3000";
                break;
        }

    }

}