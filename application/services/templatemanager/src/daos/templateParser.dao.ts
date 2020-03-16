import * as mongoose from 'mongoose';
import { TemplateParserSchema } from '../models/templateParser.model';
import { Request } from 'express';

const gepTemplateParserModel = mongoose.model('template_parser', TemplateParserSchema);

export class TemplateParserDao {

    public getAllTemplateParser(req: Request, callback: CallableFunction) {
        gepTemplateParserModel.find({}, (err, response) => {
            if (err) {
                callback(err);
            } else {
                callback(response);
            }
        });
    }
}