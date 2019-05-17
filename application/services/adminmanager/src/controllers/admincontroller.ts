import { Request, Response } from 'mongoose';
import { Adminservice } from '../service/adminservice';

let adminservice = new Adminservice();
export class AdminController {


    public adminuser(req: Request, res: Response) {

        adminservice.admin(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public getuser(req: Request, res: Response) {
        console.log('--------admincontroller');
        adminservice.admingetuser(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public getroles(req: Request, res: Response) {

        adminservice.admingetroles(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public updateuser(req:Request, res:Response){

        adminservice.adminupdateuser(req,(response)=>{
            res.status(200);
            res.json(response);
        })
    }
}