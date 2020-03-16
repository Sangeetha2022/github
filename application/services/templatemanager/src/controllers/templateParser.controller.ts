import { Request, Response } from 'express';
import { TemplateParserService } from '../services/templateParser.service';

let templateParserService = new TemplateParserService()

export class TemplateParserController {

    public getAllTemplateParser(req: Request, res: Response) {
        templateParserService.getAllTemplateParser(req, (response) => {
            res.status(200); // status for the response
            res.json(response);
        })
    }
}