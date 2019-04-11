import { Request, Response } from 'express';
import { UserTemplateService } from '../services/usertemplate.service';

let userTemplateService = new UserTemplateService();

export class UserTemplateController {

    public createUserTemplate(req: Request, res: Response) {
        userTemplateService.createUserTemplate(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public getAllUserTemplate(req: Request, res: Response) {
        userTemplateService.getAllUserTemplate(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public getAllUserTemplateByProjectId(req: Request, res: Response) {
        userTemplateService.getAllUserTemplateByProjectId(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }


    public getAllUserTemplateByProjectAndFeatureId(req: Request, res: Response) {
        userTemplateService.getAllUserTemplateByProjectAndFeatureId(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}