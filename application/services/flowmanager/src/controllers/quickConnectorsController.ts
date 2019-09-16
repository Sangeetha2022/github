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
}