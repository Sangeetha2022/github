import { Request, Response } from 'express';
import { BackendAdminService } from '../services/backendAdminService';

let backendadmin = new BackendAdminService();

export class BackendAdminController {


    public admincontroller(req: Request, res: Response) {
        backendadmin.getAdminManager(req, (response, status) => {
            if (status) {
                res.status(status);
            } else {
                res.status(200);
            }
            res.json(response);
        })
    }

}