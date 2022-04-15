import { Request, Response } from 'express';
import { CustomTemplateService } from '../services/customTemplateService';
import { CustomReactTemplateService } from '../services/customReactTemplateService'

let customTemplateService = new CustomTemplateService();
let customReactTemplateService = new CustomReactTemplateService();

export class CustomTemplateController {

    public createCustomTemplate(req: Request, res: Response) {
        console.log('entering into create custom template in controller ');
        customTemplateService.createCustomTemplate(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public createReactCustomTemplate(req: Request, res: Response) {
        console.log('entering into create custom template in controller ');
        customReactTemplateService.customReactTemplateService(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}