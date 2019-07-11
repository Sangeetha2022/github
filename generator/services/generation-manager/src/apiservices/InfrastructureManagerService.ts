import { ApiAdaptar } from '../config/ApiAdaptar';
import { SharedService } from '../config/SharedService';

export class InfraStructureManagerService {

    generateInfrastructure(projectId, details, callback) {
        new ApiAdaptar().post(
            `${SharedService.infrastructureURL}/generate/infrastructure/local/${projectId}`, details
        ).then(
            data => {
                console.log('generate infrastructure response ------->', data);
                callback(data);
            }
        ).catch(error => {
            callback(error);
        })
    }
}