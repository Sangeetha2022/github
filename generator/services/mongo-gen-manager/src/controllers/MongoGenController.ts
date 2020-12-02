
import { Request, Response } from 'express';
import { MongoGenService } from '../services/MongoGenService';

let mongoGenService = new MongoGenService();

export class MongoGenController {

    public createProjectModel(req: Request, res: Response) {
        mongoGenService.createProjectModel(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}