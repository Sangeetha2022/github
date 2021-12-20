import { Request, Response, NextFunction } from 'express';
import { Cdnservice } from '../services/CdnService';

let cdnservice = new Cdnservice;

export class CdnController {

    public chunktos3(req: Request, res: Response) {
        cdnservice.uploadChunks(req, (user) => {
            res.status(200); // status for the response
            res.json(user);
        })
    }
}