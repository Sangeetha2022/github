import {SharedService} from '../config/shardService'
import {ApiAdapter} from '../config/apiAdapter';

export class Configuration{


    public getAllEntity(callback){
        new ApiAdapter().get(`${SharedService.apiGatewayURL}/desktop/entity/getall`).then
        (data =>{
            callback(data)
        })

    }


}