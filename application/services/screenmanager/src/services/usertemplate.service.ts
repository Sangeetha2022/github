import { Request } from 'express';
import { UserTemplateDao } from '../daos/usertemplate.dao';

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


    public getAllUserTemplateByProjectId(req: Request, callback) {
        userTemplateDao.getAllUserTemplateByProjectId(req,(response) => {
            callback(response);
        });
    }

    public getAllUserTemplateByProjectAndFeatureId(req: Request, callback) {
        userTemplateDao.getAllUserTemplateByProjectAndFeatureId(req,(response) => {
            callback(response);
        });
    }
}