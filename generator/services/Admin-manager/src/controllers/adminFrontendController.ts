import { Request, Response } from 'express';
import { AdminFrontendServcie } from '../services/adminFrontendService';

const adminServcie = new AdminFrontendServcie();

export class AdminFrontendController {
 
    public adminFrontend(req: Request, res: Response) {
        const date = new Date();
        console.log('DATE---->>>>>', date.getHours() + ':' + date.getMinutes() + ':', date.getSeconds() + ':' + date.getMilliseconds());
        adminServcie.adminFrontend(req, (response, err) => {
            if (err) {
                res.send(err);
            } else {
                console.log('-----response-----',response);
                res.send(response)
            }
        })
    }
}