import { Request, Response } from 'express';
import { SefNodeService } from '../services/SefNodeService';

let sefnodeService = new SefNodeService();

export class SefNodeController {

    public createProjectSefNode(req: Request, res: Response) {
        sefnodeService.createProjectSefNode(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}