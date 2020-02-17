// export const camundaUrl = 'http://localhost:3008'


export class Constants{

public static camundaUrl : String ;

     
      constructor() {
          this.getURL();
      }
  
      public getURL() {
  
          switch (process.env.localname) {
  
              case process.env.name: Constants.camundaUrl = process.env.localcamundaUrl;   
                  break;
  
              default: Constants.camundaUrl = process.env.livecamundaUrl;
                  break;
          }
  
      }



}