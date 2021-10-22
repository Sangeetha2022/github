import { Request, Response } from 'express';
import { ReactTemplateService } from '../services/reactTemplateService';

let reactTemplateService = new ReactTemplateService();

export class ReactTemplateController {

    public createReactTemplate(req: Request, res: Response) {
        console.log('entering into create react template in controller ');
        reactTemplateService.createReactTemplate(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}