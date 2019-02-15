import { Request } from 'express';
import { LinkedConnectorDao } from '../daos/linkedconnector.dao';

let linkedConnectorDao = new LinkedConnectorDao()

export class LinkedConnectorService {

    public saveLinkedConnector(req: Request, callback: CallableFunction) {
        linkedConnectorDao.saveLinkedConnector(req, (response) => {
            callback(response);
        })
    }

    public getAllLinkedConnector(req: Request, callback: CallableFunction) {
        linkedConnectorDao.getAllLinkedConnector(req, (connector) => {
            callback(connector);
        })
    }
    
    public getLinkedConnectorByID(req: Request, next, callback: CallableFunction) {
        linkedConnectorDao.getLinkedConnectorByID(req, next, (connector) => {
            callback(connector);
        })
    }

    public getLinkedConnectorByName(req: Request, next, callback: CallableFunction) {
        linkedConnectorDao.getLinkedConnectorByName(req, next, (connector) => {
            callback(connector);
        })
    }

    public deleteLinkedConnector(req: Request, next, callback: CallableFunction) {
        const connectorID = req.params.id;
        linkedConnectorDao.deleteLinkedConnector(connectorID, next, (response) => {
            callback(response);
        })
    }

    public updateLinkedConnector(req: Request, next, callback: CallableFunction) {
        linkedConnectorDao.updateLinkedConnector(req, next, (response) => {
            callback(response)
        })
    }

}