import { Request, Response } from 'express';
import { DefaultEntityService } from '../services/DefaultEntityService';

let entityDefaultService = new DefaultEntityService();

export class DefaultEntityController {

    public createDefaultEntity(req: Request, res: Response) {
        entityDefaultService.createDafaultEntity(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}