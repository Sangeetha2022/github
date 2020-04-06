import { Request, Response, response } from 'express';
import { sharedService } from '../service/sharedService';
import * as multer from 'multer';


let SharedService = new sharedService()
var upload = multer()

export class sharedController {

    public getSharedProjectById(req: Request, res: Response) {
        SharedService.getSharedProjectById(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }


    public create(req: Request, res: Response) {
        SharedService.savesharedproject(req, res, (response) => {
            res.status(200);
            res.json(response);
        })
    }
    public upload(req: Request, res: Response) {
        SharedService.uploadProjectFile(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}