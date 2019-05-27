import { Request, Response } from 'mongoose';
import { DataGenEntityService } from '../service/dataGenEntityService';

let entityService = new DataGenEntityService

export class DataGenEntityController {

    public getAllEntity(req: Request, res: Response) {
        entityService.getAllEntity(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}