import { Request } from 'express'
import { FredDao } from '../daos/fredDao'

let fredDao: FredDao = new FredDao();

export class FredService {

    public getFred( id,callback) {
        fredDao.getFred(id,(response) => {
            callback(response);

        })

    }

}