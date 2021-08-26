import { Request, Response } from 'express';
import { NodeService } from '../services/ConntectorService';

let nodeService = new NodeService();

export class ConnectorController {

    public createProjectConnector(req: Request, res: Response) {
        nodeService.createProjectConnector(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}