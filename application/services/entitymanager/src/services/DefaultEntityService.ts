import { Request } from 'express';
import { DefaultEntityDao } from '../daos/DefaultEntityDao';

let entityDao = new DefaultEntityDao();

export class DefaultEntityService {

    public createDafaultEntity(req: Request, callback) {
        const entity = req.body;
        entityDao.createDefaultEntity(entity, (response) => {
            callback(response);
        });
    }

    public updateDafaultEntity(req: Request, callback) {
        const entity = req.body;
        console.log('before update in sevice --- ', entity);
        entityDao.updateDefaultEntity(entity, (response) => {
            callback(response);
        })
    }

    public updateDafaultEntityField(req: Request, callback) {
        const entity = req.body;
        console.log('before update in sevice --- ', entity);
        entityDao.upateDefaultEntityField(entity, (response) => {
            callback(response);
        })
    }

    public deleteDafaultEntity(req: Request, callback) {
        const entityId = req.params.id;
        entityDao.deleteDefaultEntity(entityId, (response) => {
            callback(response);
        })
    }

    public getByDafaultEntityId(req: Request, callback) {
        const entityId = req.params.id;
        entityDao.getByDefaultEntityId(entityId, (response) => {
            callback(response);
        })
    }

    public getDefaultEntityByProjectId(req: Request, callback) {
        const entityId = req.params.id;
        entityDao.getDefaultEntityByProjectId(entityId, (response) => {
            callback(response);
        })
    }
    
    public getDefaultEntityByUserId(req: Request, callback) {
        const entityId = req.params.id;
        entityDao.getDefaultEntityByUserId(entityId, (response) => {
            callback(response);
        })
    }
    
    public getAllDafaultEntity(req: Request, callback) {
        entityDao.getAllDefaultEntity((response) => {
            callback(response);
        });
    }
}