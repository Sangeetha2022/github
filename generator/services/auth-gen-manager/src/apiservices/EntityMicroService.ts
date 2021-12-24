import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

let entitydetails: any;
let Usermodel : any []
export class EntityMicroService {
    Entityservice(projectid, callback) {
        console.log("projectid--->",projectid);
        const projectId = projectid;
        new ApiAdapter().get(`${SharedService.apiGatewayURL}/desktop/entity/get/?projectId=${projectId}`).then(
            data => {
                console.log('${SharedService.apiGatewayURL}',`${SharedService.apiGatewayURL}/desktop/entity/get/?projectId=${projectId}`)
                console.log("data--->",data);
                entitydetails = data;
                 console.log('----entitydata---', JSON.parse(entitydetails));
                const entitymodel = JSON.parse(entitydetails);
                const entities = entitymodel.body;
                 console.log('------entitybody----',entities);
                entities.forEach(element => {
                     console.log('-----element---', element);
                   if (element.is_default === true){
                    Usermodel = element;
                   } 
                });
                 console.log('------entitymodel-----',Usermodel);
                callback(Usermodel);
            }).catch(error => {
                callback(error);
            })
    }
}