import { Request, Response } from 'express';
import { ConnectorService } from '../services/ConnectorService';

let connectorService = new ConnectorService()

export class ConnectorController {

    public saveConnector(req: Request, res: Response) {
        connectorService.saveConnector(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public getAllConnector(req: Request, res: Response) {
        connectorService.getAllConnector(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

    public getConnectorByID(req: Request, res: Response) {
        connectorService.getConnectorByID(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

    public deleteConnector(req: Request, res: Response) {
        connectorService.deleteConnector(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public updateConnector(req: Request, res: Response) {
        connectorService.updateConnector(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

}