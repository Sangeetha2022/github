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

    public getTemplatebyName(name, callback: CallableFunction) {

        Template.find({ name: name }, (error, templatedetails) => {
            let template = {
                'gjs-assets': templatedetails[0]['gjs-assets'],
                'gjs-styles': templatedetails[0]['gjs-styles'],
                'gjs-components': templatedetails[0]['gjs-components'],
                'stylesheets': templatedetails[0]['stylesheets'],
                'scripts': templatedetails[0]['scripts'],
                'css-guidelines': templatedetails[0]['css-guidelines'],
                'gjs-css': templatedetails[0]['gjs-css'],
                'gjs-html': templatedetails[0]['gjs-html'],
                'template_id': templatedetails[0]._id,
                'template_name': templatedetails[0].name,
            };
            if (error) {
                callback(error);
            } else {
                callback(template);
            }
        })
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
        Template.findByIdAndDelete(req.params.id, (err, template) => {
            if (err) {
                callback(err);
            } else {
                callback({ message: 'Successfully deleted contact!' });
            }
        });
    }
}