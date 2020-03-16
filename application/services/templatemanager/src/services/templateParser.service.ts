import { Request } from 'express';
import { TemplateParserDao } from '../daos/templateParser.dao';

let templateParserDao = new TemplateParserDao()

export class TemplateParserService {

 
    public getAllTemplateParser(req: Request, callback: CallableFunction) {
        templateParserDao.getAllTemplateParser(req, (response) => {
            callback(response)
        })
    }
}