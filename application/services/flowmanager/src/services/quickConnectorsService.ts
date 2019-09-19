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

    public getConnectorById(req: Request, callback: CallableFunction) {
        let id = req.params.id;
        quickConnectorsDao.getConnectorById(id, (response) => {
            callback(response);
        })

    }

    public getConnectorByEntity(req: Request, callback: CallableFunction) {
        let entityId = req.params.id;
        quickConnectorsDao.getConnectorByEntity(entityId, (response) => {
            callback(response);
        })

    }

    public deleteConnectorById(req: Request, callback: CallableFunction) {
        let id = req.params.id;
        quickConnectorsDao.deleteConnectorById(id, (response) => {
            callback(response);
        })

    }

    public getConnectorById(req: Request, callback: CallableFunction) {
        let id = req.params.id;
        quickConnectorsDao.getConnectorById(id, (response) => {
            callback(response);
        })

    }
}