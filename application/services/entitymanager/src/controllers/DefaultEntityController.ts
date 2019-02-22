import { Request, Response } from 'express';
import { DefaultEntityService } from '../services/DefaultEntityService';

let entityService = new DefaultEntityService();

export class DefaultEntityController {

    public createDefaultEntity(req: Request, res: Response) {
        entityService.createDafaultEntity(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }


    public updateDefaultEntity(req: Request, res: Response) {
        entityService.updateDafaultEntity(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public updateDefaultEntityField(req: Request, res: Response) {
        entityService.updateDafaultEntityField(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public deleteDefaultEntity(req: Request, res: Response) {
        entityService.deleteDafaultEntity(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public getByDefaultEntityId(req: Request, res: Response) {
        entityService.getByDafaultEntityId(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public getDefaultEntityByProjectId(req: Request, res: Response) {
        entityService.getDefaultEntityByProjectId(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public getDefaultEntityByUserId(req: Request, res: Response) {
        entityService.getDefaultEntityByUserId(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public getAllDefaultEntity(req: Request, res: Response) {
        entityService.getAllDafaultEntity(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}