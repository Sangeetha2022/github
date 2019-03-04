import { Request } from 'express';
import { EntityDao } from '../daos/EntityDao';
import * as util from 'util';
import { EntityWorker } from '../worker/EntityWorker';

let entityDao = new EntityDao();
let entityWorker = new EntityWorker();

export class EntityService {



    public generateEntity = async (req: Request, callback) => {
        const projectId = req.params.projectId;
        entityDao.getEntityByProjectId(projectId, (response) => {
            console.log('generate entity in services are -----------  ', response.length, ' -- ',
                util.inspect(response, { showHidden: false, depth: null }));
                let count = 0;
            if (response.length > 0) {
                response.forEach(element => {
                    entityWorker.entityModelWorker(element, (result) => {
                        count++;
                        console.log('inside one in controller')
                        if(count === response.length - 1) {
                            callback('file created successfully')
                        }
                    })
                })
            }
            console.log('ouside one in controller')
        });
    }

}