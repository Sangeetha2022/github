import { Request } from 'mongoose';
import * as fs from 'fs';
import { SharedService } from '../config/SharedService';
import { ApiAdaptar } from '../config/ApiAdaptar';

export class BackendService {
    sharedService = new SharedService();
    apiAdapter = new ApiAdaptar()
    backend: String;
    public createbackend(req: Request, callback: CallableFunction) {
        const backendDetails = req.body;
        console.log('backendDetails are ----- ', backendDetails);
        this.backend = backendDetails.language;
        if (this.backend === 'node') {
            this.apiAdapter.post(
                `${SharedService.apiGatewayURL}/desktop/node/generate`,backendDetails
            ).then(
                data => {
                    callback(data);
                }
            ).catch(error => {
                callback(error);
            })
        }

        else if (this.backend === 'java') {
            this.apiAdapter.get(
                `${SharedService.apiGatewayURL}/desktop/entity/getall`
            ).then(
                data => {
                    console.log('create project code ---- ', data);
                    callback(data);
                }
            ).catch(error => {
                callback(error);
            })
        }

        else if (this.backend === 'python') {
            this.apiAdapter.get(
                `${SharedService.apiGatewayURL}/desktop/feature/getall`
            ).then(
                data => {
                    console.log('create project code ---- ', data);
                    callback(data);
                }
            ).catch(error => {
                callback(error);
            })
        }
    }
}