import { ApiAdapter } from '../config/ApiAdapter';
import { SharedService } from '../config/SharedService';

export class MenuBuilderService {

    Menubuilder(projectid, callback) {
        const projectId = projectid;
        console.log('------projectid-----', projectId);
        new ApiAdapter().get(`${SharedService.apiGatewayURL}/desktop/menu/getbyprojectid/${projectId}`).then
            (data => {
                console.log('SharedService.apiGatewayURL',`${SharedService.apiGatewayURL}/desktop/menu/getbyprojectid/${projectId}`)
                console.log('----data---', data);
                callback(data);
            }).catch(error => {
                callback(error);
            })
    }
}