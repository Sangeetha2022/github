import { Request } from 'express'
import { FredDao } from '../daos/fredDao'

let fredDao: FredDao = new FredDao();

export class FredService {

    public getFred(req: Request,callback :CallableFunction) {
        let data = {
            projectId: req.body.projectId,
            featureId: req.body.feature_id,
            endPointUrl: req.body.endPointUrl,
            params:req.body.params,
            api_key: req.body.api_key,
        };
        fredDao.getFred(data,(response) => {
            callback(response);

        })

    }

    public quickTest(req:Request , callback: CallableFunction) {
        const data = req.body;
        fredDao.quickTest(data , (response) => {
            callback(response)
        })
             
    }

}