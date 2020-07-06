import { Request } from 'express';
import * as util from 'util';
import * as fs from 'fs';
import * as asyncLoop from 'node-async-loop';
import { ApiGatewayWorker } from '../worker/ApiGatewayWorker';
import { Common } from '../config/Common';
import { CommonWorker } from '../worker/CommonWorker';
import * as ncp from 'ncp';


let apiGatewayWorker = new ApiGatewayWorker();
let commonWorker = new CommonWorker();
export class WcmxService {
    private SOURCE_PATH = '/Users/10decoders/Desktop/Geppetto/generated-code/mithun/application/services/custom_services/';
    private WCMX_ACOUSTICPATH = '/Users/10decoders/Desktop/Geppetto/generated-code/mithun/application/services/custom_services/wcmx-acoustic'
    private CDNMANAGER_PATH = '/Users/10decoders/Desktop/Geppetto/generated-code/mithun/application/services/custom_services/cdn-manager'
    private SEED_ACOUSTICPATH = '/Users/10decoders/Desktop/Geppetto/geppettotest/generator/services/seed/wcmx-acoustic/'
    private SEED_CDNMANAGERPATH = '/Users/10decoders/Desktop/Geppetto/geppettotest/generator/services/seed/cdn-manager/'

    public wcmxAcoustic(req: Request, callback) {
        console.log("entering into the wcmxauostic--->");
        if (this.SOURCE_PATH) {
            if (!fs.existsSync(this.WCMX_ACOUSTICPATH)) {
                console.log('-----coming here for acoustic creation---', this.WCMX_ACOUSTICPATH);
                fs.mkdirSync(this.WCMX_ACOUSTICPATH);
            }
            if (!fs.existsSync(this.CDNMANAGER_PATH)) {
                console.log('-----coming here for cdnmanager creation---', this.CDNMANAGER_PATH);
                fs.mkdirSync(this.CDNMANAGER_PATH);
            }
            //copy template files for acoustic
            ncp.limit = 16;
            ncp(this.SEED_ACOUSTICPATH, this.WCMX_ACOUSTICPATH, (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log('acoustic code generated.....');
            });
            ncp(this.SEED_CDNMANAGERPATH, this.CDNMANAGER_PATH, (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log('cdnamanger code generated.....');
            });
        }
    }
}
