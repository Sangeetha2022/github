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
}