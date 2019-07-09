import { Request, Response } from 'express';
import { AngularTemplateService } from '../services/AngularTemplateService';

let angularTemplateService = new AngularTemplateService();

export class AngularTemplateController {

    public createAngularTemplate(req: Request, res: Response) {
        console.log('entering into create angular template in controller ');
        angularTemplateService.createAngularTemplate(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}