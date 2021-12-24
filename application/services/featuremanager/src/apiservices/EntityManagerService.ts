import { ApiAdapter } from "../config/ApiAdapter";
import { SharedService } from "../config/SharedService"

export class EntityManagerService {

  public getAllFeatureEntites(entites, callback) {
    new ApiAdapter().post(`${ SharedService.apiGatewayURL}/desktop/entity/feature`, entites).then(data => {
      callback(data)
    }).catch(error => {
      callback(error)
    })
  }
}