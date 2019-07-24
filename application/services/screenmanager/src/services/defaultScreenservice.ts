import { Request } from 'express';
import { DefaultScreendao } from '../daos/defaultScreendao';


let defaultscreendao = new DefaultScreendao();
export class DefaultScreenservice {

    public async createdefaultscreen(req: Request, callback) {
        let projectId = req.query.projectId;
        defaultscreendao.getdefaultscreen(projectId, (response) => {
            callback(response);
        })
    }
}