import { Request, Response } from 'express'
import { QuickConnectorsDao } from '../daos/quickConnectorsDao';

const quickConnectorsDao = new QuickConnectorsDao();


export class QuickConnectorsService {
    public saveConnectors(req: Request, callback: CallableFunction) {
        let data = req.body;
        quickConnectorsDao.saveConnectors(data, (response) => {
            callback(response);
        })

    }
}