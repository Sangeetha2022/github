import { Request, Response } from 'express';
import { NodeService } from '../services/NodeService';

let nodeService = new NodeService();

export class NodeController {

    public createProjectNode(req: Request, res: Response) {
        nodeService.createProjectNode(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}