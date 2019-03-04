import { Request, Response } from 'express';
import { EntityService } from '../services/EntityService';

let entityService = new EntityService();

export class EntityController {

    public generateEntity(req: Request, res: Response) {
        entityService.generateEntity(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}