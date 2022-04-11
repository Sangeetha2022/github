import * as mongoose from 'mongoose';
import { DeleteSchema } from '../models/delete.model';
import { Request, Response } from 'express';
import { DeleteService } from '../services/delete.service';

const deleteSchema = mongoose.model('Project', DeleteSchema);
let deleteService = new DeleteService()

export class DeleteController 
{
    public deleteProjectById(req: Request, res: Response) 
    {
        deleteService.deleteProjectById(req, (response) => 
        {
            res.status(200);
            res.json(response);
        })
    }


    public deleteEntity(req: Request, res: Response) 
    {
        deleteService.deleteEntity(req, (response) => 
        {
            res.status(200);
            res.json(response);
        })
    }

    public deleteFeature(req: Request, res: Response) 
    {
        deleteService.deleteFeature(req, (response) => 
        {
            res.status(200);
            res.json(response);
        })
    }

    public deleteMenu(req: Request, res: Response) 
    {
        deleteService.deleteMenu(req, (response) => 
        {
            res.status(200);
            res.json(response);
        })
    }


    public deleteScreen(req: Request, res: Response) 
    {
        deleteService.deleteScreen(req, (response) => 
        {
            res.status(200);
            res.json(response);
        })
    } 

    public deleteFlow(req: Request, res: Response) 
    {
        deleteService.deleteFlow(req, (response) => 
        {
            res.status(200);
            res.json(response);
        })
    } 
}