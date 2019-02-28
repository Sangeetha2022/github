import { Request } from 'express';
import { EntityTypeDao } from '../daos/EntityTypeDao';

let entityTypeDao = new EntityTypeDao();

export class EntityTypeService {

    public getAllEntity(req: Request, callback) {
        entityTypeDao.getAllEntity((response) => {
            callback(response);
        });
    }
}