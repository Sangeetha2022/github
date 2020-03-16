export class SharedService {
  //local
  // public static camundaBaseUrl = "http://localhost";

  //kubernetes   
  // public static camundaURL: String = "http://gep-dev-camunda.gep-dev-201902.svc.cluster.local:6000";


  // public static camundaBaseUrl: string;
  public static camundaURL: String;

  constructor() {
    this.getURL();
  }

  public getURL() {

    switch (process.env.localname) {

      case process.env.name: SharedService.camundaURL = process.env.localcamundaBaseUrl + ":" + process.env.camundaPort;

        break;

      default: SharedService.camundaURL = process.env.livecamundaURL;
        break;
    }

  }

}
