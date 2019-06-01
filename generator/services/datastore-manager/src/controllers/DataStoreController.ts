
import { Request, Response } from 'mongoose';
import { DataStoreService } from '../services/DataStoreService';

let dataStoreService = new DataStoreService();

export class DataStoreController {

    public createProject(req: Request, res: Response) {
        dataStoreService.createProject(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}