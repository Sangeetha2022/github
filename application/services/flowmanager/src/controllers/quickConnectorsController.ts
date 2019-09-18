import {Request , Response} from 'express';
import {QuickConnectorsService} from '../services/quickConnectorsService';

const quickConnectorService = new QuickConnectorsService()


export class QuickConnectorsController {
    public saveConnectors(req: Request , res: Response){
        quickConnectorService.saveConnectors(req , (response) => {
            res.status(200);
            res.json(response);
        })
    }


    public getConnectorByEntity(req: Request , res: Response){
        quickConnectorService.getConnectorByEntity(req , (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public deleteConnectorById(req: Request , res: Response){
        quickConnectorService.deleteConnectorById(req , (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public getConnectorById(req: Request , res: Response){
        quickConnectorService.getConnectorById(req , (response) => {
            res.status(200);
            res.json(response);
        })
    }
  
}