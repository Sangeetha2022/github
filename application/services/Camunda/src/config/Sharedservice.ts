export class SharedService {
  
    //local
      // public static camundaBaseUrl = "http://localhost";
  
    //kubernetes
      public static camundaBaseUrl = "http://gep-dev-camunda.gep-dev-201902.svc.cluster.local";
      
      public static camundaURL: String = SharedService.camundaBaseUrl + ":8080";
  
  }