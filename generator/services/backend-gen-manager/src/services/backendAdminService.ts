import { Request, Response } from 'mongoose';
import { SharedService } from '../config/SharedService';
import { ApiAdaptar } from '../config/ApiAdaptar';
import { AdminManagerService } from '../apiservices/AdminManagerService';
import * as ncp from 'ncp';
import * as fs from 'fs';


export class BackendAdminService {

    adminmanagerservice = new AdminManagerService();
    apiAdapter = new ApiAdaptar();
    sharedService = new SharedService();

    getAdminManager(req:Request, callback: CallableFunction) {
        console.log('------request-----',req.body);
        var feature = req.body.feature;
        var projectId = req.body.projectId;
        var projectgenpath = req.body.projectgenpath;
        var seedpath = req.body.seed;

        var SOURCE_PATH = projectId;

        var WCMX_ACOUSTICPATH = `${projectgenpath}/wcmx-acoustic`;
        var CDNMANAGER_PATH = `${projectgenpath}/cdn-manager`;
        var SEED_ACOUSTICPATH = `${seedpath}/wcmx-acoustic`;
        var SEED_CDNMANAGERPATH = `${seedpath}/cdn-manager`;

        console.log("SEED_CDNMANAGERPATH", SEED_CDNMANAGERPATH);

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
        

        this.adminmanagerservice.getAdmin(feature, projectId, projectgenpath,seedpath, (data) => {
            callback(data);
        })
    }
    
}