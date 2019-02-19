import { Request } from 'express';
import { EntityDao } from '../daos/EntityDao';

let entityDao = new EntityDao();

export class EntityService {

    public createEntity(req: Request, callback) {
        const entity = req.body;
        entityDao.createEntity(entity, (response) => {
            callback(response);
        });
    }

    public updateEntity(req: Request, callback) {
        const entity = req.body;
        console.log('before update in sevice --- ', entity);
        entityDao.updateEntity(entity, (response) => {
            callback(response);
        })
    }

    public deleteEntity(req: Request, callback) {
        const entityId = req.params.id;
        entityDao.deleteEntity(entityId, (response) => {
            callback(response);
        })
    }

    public getByEntityId(req: Request, callback) {
        const entityId = req.params.id;
        entityDao.getByEntityId(entityId, (response) => {
            callback(response);
        })
    }

    public getAllEntity(req: Request, callback) {
        entityDao.getAllEntity((response) => {
            callback(response);
        });
    }
}