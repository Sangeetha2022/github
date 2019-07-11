import { Request, Response } from 'mongoose';
import { SharedService } from '../config/SharedService';
import { ApiAdaptar } from '../config/ApiAdaptar';
import { AdminManagerService } from '../apiservices/AdminManagerService';

export class BackendAdminService {

    adminmanagerservice = new AdminManagerService();
    apiAdapter = new ApiAdaptar();
    sharedService = new SharedService();

    getAdminManager(req:Request, callback: CallableFunction) {
        console.log('------request-----',req.body);
        let feature = req.body.feature;
        let projectId = req.body.projectId;
        let projectgenpath = req.body.projectgenpath;
        let seedpath = req.body.seed;
        this.adminmanagerservice.getAdmin(feature, projectId, projectgenpath,seedpath, (data) => {
            callback(data);
        })
    }


}