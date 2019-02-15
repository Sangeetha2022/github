import { Request, Response, NextFunction } from 'express';
import { LinkedConnectorService } from '../services/linkedconnector.service';

let connectorService = new LinkedConnectorService()

export class LinkConnectorController {

    public saveLinkedConnector(req: Request, res: Response) {
        connectorService.saveLinkedConnector(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public getAllLinkedConnector(req: Request, res: Response) {
        connectorService.getAllLinkedConnector(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

    public getLinkedConnectorByID(req: Request, res: Response, next: NextFunction) {
        connectorService.getLinkedConnectorByID(req, next, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

    public getLinkedConnectorByName(req: Request, res: Response, next: NextFunction) {
        connectorService.getLinkedConnectorByName(req, next, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }

    public deleteLinkedConnector(req: Request, res: Response, next: NextFunction) {
        connectorService.deleteLinkedConnector(req, next, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public updateLinkedConnector(req: Request, res: Response, next: NextFunction) {
        connectorService.updateLinkedConnector(req, next, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }

}