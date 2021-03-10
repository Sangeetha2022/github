import { Request } from 'express';
import { TemplateDao } from '../daos/template.dao';

let templateDao = new TemplateDao()

export class TemplateService {

    public addTemplate(req: Request, callback: CallableFunction) {
        templateDao.addTemplate(req, (template) => {
            callback(template)
        })
    }

    public addProjectTemplate(req: Request, callback: CallableFunction) {
        templateDao.addProjectTemplate(req, (template) => {
            callback(template);
        });
    }

    public getAllTemplateByProject(req: Request, callback: CallableFunction) {
        templateDao.getAllTemplateByProject(req, (template) => {
            callback(template)
        });
    }

    public getProjectTemplateByProject(req: Request, callback: CallableFunction) {
        templateDao.getProjectTemplateByProject(req, (template) => {
            callback(template);
        })
    }

    public getAllTemplates(req: Request, callback: CallableFunction) {
        templateDao.getAllTemplates(req, (template) => {
            callback(template)
        })
    }

    public getTemplateByName(req:Request, callback: CallableFunction){
        console.log('------------------->>>>>>>>',req.query.template_name);
        let name = req.query.template_name;
        templateDao.getTemplatebyName(name,(template_res)=>{
            callback(template_res);
        })
    }

    public getTemplateByID(req: Request, callback: CallableFunction) {
        templateDao.getTemplateByID(req, (template) => {
            callback(template)
        })
    }

    public getProjectTemplateByID(req: Request, callback: CallableFunction) {
        templateDao.getProjectTemplateByID(req, (template, err) => {
            if (err) {
                callback(err);
            } else {
                callback(template);
            }
        })
    }

    public updateTemplate(req: Request, callback: CallableFunction) {
        templateDao.updateTemplate(req, (template) => {
            callback(template)
        })
    }

    public deleteTemplate(req: Request, callback: CallableFunction) {
        templateDao.deleteTemplate(req, (template) => {
            callback(template)
        })
    }
}