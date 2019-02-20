import { Request, Response } from 'express';
import { EntityService } from '../services/EntityService';

let entityService = new EntityService();

export class EntityController {

    public createEntity(req: Request, res: Response) {
        entityService.createEntity(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }


    public updateEntity(req: Request, res: Response) {
        entityService.updateEntity(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public updateEntityField(req: Request, res: Response) {
        entityService.updateEntityField(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public deleteEntity(req: Request, res: Response) {
        entityService.deleteEntity(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public getByEntityId(req: Request, res: Response) {
        entityService.getByEntityId(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public getAllEntity(req: Request, res: Response) {
        entityService.getAllEntity(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}