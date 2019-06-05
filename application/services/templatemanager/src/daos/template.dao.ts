import * as mongoose from 'mongoose';
import { TemplateSchema } from '../models/template.model';
import { Request } from 'express';

const Template = mongoose.model('Geppetto_Template', TemplateSchema);

export class TemplateDao {

    public addTemplate(req: Request, callback: CallableFunction) {
        let newTemplate = new Template(req.body);

        newTemplate.save((err, template) => {
            if (err) {
                callback(err);
            } else {
                callback(template);
            }
        });
    }

    public getAllTemplateByProject(req: Request, callback: CallableFunction) {
        let projectId = req.params.projectid;
        Template.find({ project_id: projectId }, (err, template) => {
            if (err) {
                callback(err);
            } else {
                callback(template);
            }
        });
    }

    public getAllTemplates(req: Request, callback: CallableFunction) {
        Template.find({}, (err, template) => {
            if (err) {
                callback(err);
            } else {
                callback(template);
            }
        });
    }

    public getTemplateByID(req: Request, callback: CallableFunction) {
        Template.findById(req.params.id).exec((err, template) => {
            if (err) {
                callback(err);
            } else {
                // console.log('Template id --------- ', template)

                callback(template);
            }
        });
    }

    public updateTemplate(req: Request, callback: CallableFunction) {
        Template.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, template) => {
            if (err) {
                callback(err);
            } else {
                callback(template);
            }
        });
    }

    public deleteTemplate(req: Request, callback: CallableFunction) {
        Template.remove({ _id: req.params.id }, (err, template) => {
            if (err) {
                callback(err);
            } else {
                callback({ message: 'Successfully deleted contact!' });
            }
        });
    }
}