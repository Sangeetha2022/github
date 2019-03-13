import { Request } from 'express';
import { DefaultEntityDao } from '../daos/DefaultEntityDao';
import { EntityDao } from '../daos/EntityDao';
import { UserEntity } from '../assets/UserEntity';

let entityDefaultDao = new DefaultEntityDao();
let entityDao = new EntityDao();

export class DefaultEntityService {

    public async createDafaultEntity(req: Request, callback) {
        const projectId = req.query.projectId;
        // UserEntity.project_id = projectId;
        let count = 1;
        entityDefaultDao.getDefaultEntity((response) => {
            console.log('response for default tabvle ---- ', response);
            if (response) {
                response.forEach(async element => {
                    console.log(" - - - - - -  -  > > >  ", element)
                     delete element.__v;
                     var defaultObj = {
                         name: element.name,
                         description: element.description,
                         project_id: projectId,
                         is_default: true,
                         field: element.field
                     }
                    console.log('each element in default object ---- ', element);
                    entityDao.createEntity(defaultObj, (createdEntity) => {
                        if (count === response.length) {
                            callback(createdEntity);
                        }
                        count++;
                    })
                })
            }
        })
        // entityDao.createEntity(UserEntity, (response) => {
        //     callback(response);
        // });
    }
}