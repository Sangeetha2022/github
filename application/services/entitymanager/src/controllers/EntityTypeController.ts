import { Request, Response } from 'express';
import { EntityTypeService } from '../services/EntityTypeService';

let entityTypeService = new EntityTypeService();

export class EntityTypeController {

    public getAllEntity(req: Request, res: Response) {
        entityTypeService.getAllEntity(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}