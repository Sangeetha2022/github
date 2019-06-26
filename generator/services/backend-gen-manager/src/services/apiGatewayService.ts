import { Request } from 'mongoose';
import * as fs from 'fs';
import { SharedService } from '../config/SharedService';
import { ApiAdaptar } from '../config/ApiAdaptar';
import { MicroFlowManagerService } from '../apiservices/MicroFlowManagerService';
import { NodeGenManagerService } from '../apiservices/NodeGenManagerService';

export class ApiGatewayService {
    sharedService = new SharedService();
    nodeService = new NodeGenManagerService();
    microFlowService = new MicroFlowManagerService();
    apiAdapter = new ApiAdaptar()
    backend: String;


    public async createApiGateway(req: Request, callback: CallableFunction) {
        const apiGateway = await this.generateApiGateway(req.body);
        console.log('backend services apigateway ----@@@@@@@@@@@@@@@@@@@@@@-   ', apiGateway);
        callback('apigateway generated')
    }

    generateApiGateway(details) {
        return new Promise(resolve => {
            this.nodeService.generateApiGateway(details, (data) => {
                resolve(data);
            });
        })
    }
}