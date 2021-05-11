import { Request, Response, response } from 'express';
import { cloneService } from '../service/cloneService';
import * as multer from 'multer';


let CloneService = new cloneService()
var upload = multer()

export class cloneController {

    public getCloneProjectById(req: Request, res: Response) {
        CloneService.getCloneProjectById(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

}