import { ApiAdaptar } from "../config/ApiAdaptar";
import { SharedService } from "../config/SharedService"

export class EntityManagerService {

  public getAllFeatureEntites(entites, callback) {
    new ApiAdaptar().post(`${ SharedService.apiGatewayURL}/desktop/entity/feature`, entites).then(data => {
      callback(data)
    }).catch(error => {
      callback(error)
    })
  }
}