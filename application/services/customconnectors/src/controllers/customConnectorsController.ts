import { CustomConnectorsService } from '../services/customConnectorsService'
import { Request, Response } from 'express';

let customConnectorsService: CustomConnectorsService = new CustomConnectorsService();

export class CustomConnenctorsController {

    public quickTestcustomConnectors(req: Request, res: Response) {
        customConnectorsService.quickTestcustomConnectors(req, (response) => {
            res.status(200);
            res.json(response)
        })

    }
}