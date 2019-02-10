import { Request } from 'express';
import { ConnectorDao } from '../daos/ConnectorDao';

let connectorDao = new ConnectorDao()

export class ConnectorService {

    public saveConnector(req: Request, callback: CallableFunction) {
        const connector = req.body;
        connectorDao.saveConnector(connector, (response) => {
            callback(response);
        })
    }

    public getAllConnector(req: Request, callback: CallableFunction) {
        connectorDao.getAllConnector(req, (connector) => {
            callback(connector);
        })
    }

    public getConnectorByID(req: Request, callback: CallableFunction) {
        connectorDao.getConnectorByID(req, (connector) => {
            callback(connector);
        })
    }

    public deleteConnector(req: Request, callback: CallableFunction) {
        console.log('delete connector in service --- ', req.params);
        const connectorID = req.params.id;
        connectorDao.deleteConnector(connectorID, (response) => {
            callback(response);
        })
    }
    
    public updateConnector (req: Request, callback:CallableFunction) {           
        connectorDao.updateConnector(req, (response) => {
            callback(response)
        })
    }

}