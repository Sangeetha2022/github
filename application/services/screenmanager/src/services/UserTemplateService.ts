import { Request } from 'express';
import { UserTemplateDao } from '../daos/UserTemplateDao';

let userTemplateDao = new UserTemplateDao();

export class UserTemplateService {

    public createUserTemplate(req: Request, callback) {
        const template = req.body;
        userTemplateDao.createUserTemplate(template, (response) => {
            callback(response);
        });
    }

    public getAllUserTemplate(req: Request, callback) {
        userTemplateDao.getAllUserTemplate((response) => {
            callback(response);
        });
    }
}