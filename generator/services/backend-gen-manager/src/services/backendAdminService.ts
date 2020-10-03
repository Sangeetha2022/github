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

        this.adminmanagerservice.getAdmin(feature, projectId, projectgenpath,seedpath, (data) => {
            callback(data);
        })
    }
    
}