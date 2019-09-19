import * as mongoose from 'mongoose';
import { DeleteSchema } from '../models/delete.model';
import { Request, Response } from 'express';
import { DeleteService } from '../services/delete.service';

const deleteSchema = mongoose.model('Project', DeleteSchema);
let deleteService = new DeleteService()

export class DeleteController {

    public deleteProjectFlow(req: Request, res: Response) {
        deleteService.deleteProjectFlow(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }


    public deleteEntityFlow(req: Request, res: Response) {
        deleteService.deleteEntityFlow(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public deleteFeatureFlow(req: Request, res: Response) {
        deleteService.deleteFeatureFlow(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public deleteMenuFlow(req: Request, res: Response) {
        deleteService.deleteMenuFlow(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }


public deleteScreenFlow(req: Request, res: Response) {
        deleteService.deleteScreenFlow(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }   
}