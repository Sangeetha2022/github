import { Request } from 'mongoose';
import * as fs from 'fs';
import * as ncp from 'ncp';
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
        console.log("req.body", req.body);
        var featuretype = req.body.feature
        var projectgenpath = req.body.projectGenerationPath;
        var seedpath = req.body.project.templateLocation.authTemplatePath;
        console.log("req-------->projectGenerationPath", req.body.projectGenerationPath);
        console.log("req-------->authTemplatePath", req.body.project.templateLocation.authTemplatePath);

        if (featuretype.body != undefined && featuretype.body.length != 0) {
            if (req.body.feature.body[0].type === 'private') {
                var WCMX_ACOUSTICPATH = `${projectgenpath}/wcmx-acoustic`;
                var CDNMANAGER_PATH = `${projectgenpath}/cdn-manager`;
                var SEED_ACOUSTICPATH = `${seedpath}/wcmx-acoustic`;
                var SEED_CDNMANAGERPATH = `${seedpath}/cdn-manager`;

                console.log("SEED_CDNMANAGERPATH", SEED_CDNMANAGERPATH);
                if (!fs.existsSync(projectgenpath)) {
                    fs.mkdirSync(projectgenpath);
                }
                if (!fs.existsSync(WCMX_ACOUSTICPATH)) {
                    console.log('-----coming here for acoustic creation---', WCMX_ACOUSTICPATH);
                    fs.mkdirSync(WCMX_ACOUSTICPATH);
                }
                if (!fs.existsSync(CDNMANAGER_PATH)) {
                    console.log('-----coming here for cdnmanager creation---', CDNMANAGER_PATH);
                    fs.mkdirSync(CDNMANAGER_PATH);
                }
                //copy template files for acoustic
                ncp.limit = 16;
                ncp(SEED_ACOUSTICPATH, WCMX_ACOUSTICPATH, (err) => {
                    if (err) {
                        return console.error(err);
                    }
                    console.log('acoustic code generated.....');
                });
                ncp(SEED_CDNMANAGERPATH, CDNMANAGER_PATH, (err) => {
                    if (err) {
                        return console.error(err);
                    }
                    console.log('cdnamanger code generated.....');
                });

            }
        }
        const apiGateway = await this.generateApiGateway(req.body);
        console.log('backend services apigateway ----@@-   ', apiGateway);
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