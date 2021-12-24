import { Request, Response } from 'express';
import { SharedService } from '../config/SharedService';
import { ApiAdapter } from '../config/ApiAdapter';
import { AdminManagerService } from '../apiservices/AdminManagerService';
import * as ncp from 'ncp';
import * as fs from 'fs';


export class BackendAdminService {

    adminmanagerservice = new AdminManagerService();
    apiAdapter = new ApiAdapter();
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