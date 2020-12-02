
import { Request, Response } from 'express';
import { FrontendTemplateService } from '../services/frontendTemplateService';

let frontendTemplateService = new FrontendTemplateService();

export class FrontendTemplateController {

    public frontendTemplateProject(req: Request, res: Response) {
        frontendTemplateService.frontendTemplateProject(req, (response, status) => {
            if (status) {
                res.status(status);
            } else {
                res.status(200);
            }
            res.json(response);
        })
    }
}