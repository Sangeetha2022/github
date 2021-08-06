import { Request } from 'express';
import { SefScreenDao } from '../daos/SefScreenDao';


let sefscreendao = new SefScreenDao();
export class SefScreenService {

    public async createSefScreen(req: Request, callback) {
        let projectId = req.query.projectId;
        let featureId = req.query.featureId;
        let data =  req.body;
        sefscreendao.getsefscreen(projectId, featureId, data, (response) => {
            callback(response);
        })
    }
}