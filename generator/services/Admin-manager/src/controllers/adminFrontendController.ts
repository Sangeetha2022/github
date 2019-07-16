import { Request, Response } from 'express';
import { AdminFrontendServcie } from '../services/adminFrontendService';

const adminServcie = new AdminFrontendServcie();

export class AdminFrontendController {
 
    public adminfrontend(req: Request, res: Response) {
        adminServcie.adminfrontend(req, (response, err) => {
            if (err) {
                res.send(err);
            } else {
                console.log('-----response-----',response);
                res.send(response)
            }
        })
    }
}