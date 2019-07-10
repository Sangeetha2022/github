import { Request, Response } from 'express';
import { AdminServcie } from '../services/adminService';

const adminServcie = new AdminServcie();

export class AdminController {
 
    public admin(req: Request, res: Response) {
        adminServcie.admin(req, (response, err) => {
            if (err) {
                res.send(err);
            } else {
                res.send(response)
            }
        })
    }
}