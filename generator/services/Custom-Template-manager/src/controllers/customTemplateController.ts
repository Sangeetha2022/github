import { Request, Response } from 'express';
import { CustomTemplateService } from '../services/customTemplateService';

let customTemplateService = new CustomTemplateService();

export class CustomTemplateController {

    public createCustomTemplate(req: Request, res: Response) {
        console.log('entering into create custom template in controller ');
        customTemplateService.createCustomTemplate(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}