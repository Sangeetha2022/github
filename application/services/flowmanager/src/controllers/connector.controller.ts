import { Request, Response, NextFunction } from 'express';
import { ConnectorService } from '../services/connector.service';

let connectorService = new ConnectorService()

export class ConnectorController {

    // public saveConnector(req: Request, res: Response) {
    //     connectorService.saveConnector(req, (response) => {
    //         res.status(200);
    //         res.json(response);
    //         console.log("i am in controller",response)

    //     })
    // }

    // public getAllConnector(req: Request, res: Response) {
    //     connectorService.getAllConnector(req, (user) => {
    //         res.status(200); // status for the response
    //         res.json(user);
    //     })
    // }

    // public getConnectorByID(req: Request, res: Response, next: NextFunction) {
    //     connectorService.getConnectorByID(req, next, (user) => {
    //         res.status(200); // status for the response
    //         res.json(user);
    //     })
    // }

    // public deleteConnector(req: Request, res: Response, next: NextFunction) {
    //     connectorService.deleteConnector(req, next, (response) => {
    //         res.status(200);
    //         res.json(response);
    //     })
    // }

    // public updateConnector(req: Request, res: Response, next: NextFunction) {
    //     connectorService.updateConnector(req, next, (response) => {
    //         res.status(200); // status for the response
    //         res.json(response);
    //     })
    // }

}