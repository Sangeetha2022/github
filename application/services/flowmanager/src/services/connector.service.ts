import { Request } from 'express';
import { ConnectorDao } from '../daos/connector.dao';

let connectorDao = new ConnectorDao()

export class ConnectorService {

    public saveConnector(req: Request, callback: CallableFunction) {
        connectorDao.saveConnector(req, (response) => {
            callback(response);
            console.log("i am in service",response)
        })
    }

    public getAllConnector(req: Request, callback: CallableFunction) {
        connectorDao.getAllConnector(req, (connector) => {
            callback(connector);
        })
    }
    
    public getConnectorByID(req: Request, next, callback: CallableFunction) {
        connectorDao.getConnectorByID(req, next, (connector) => {
            callback(connector);
        })
    }

    public deleteConnector(req: Request, next, callback: CallableFunction) {
        const connectorID = req.params.id;
        connectorDao.deleteConnector(connectorID, next, (response) => {
            callback(response);
        })
    }

    public updateConnector(req: Request, next, callback: CallableFunction) {
        connectorDao.updateConnector(req, next, (response) => {
            callback(response)
        })
    }

}