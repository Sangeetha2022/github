'use strict'
import * as mongoose from 'mongoose';
import { UserTemplateSchema } from '../models/usertemplate.model';

const UserTemplateModel = mongoose.model('UserTemplate', UserTemplateSchema);

export class UserTemplateDao {
    constructor() { }

    public createUserTemplate(userTemplate, callback) {
        let template = new UserTemplateModel(userTemplate);
        template.save().then((result) => {
            console.log('save template result ----- ', result);
            callback(result);
        }).catch((error) => {
            console.log('save template error -----  ', error);
            callback(error);
        });
    }

    public getAllUserTemplate(callback) {
        UserTemplateModel.find().then((result) => {
            callback(result);
        }).catch((error) => {
            callback(error);
        });
    }

    public getAllUserTemplateByProjectId(req, callback) {
        let projectId = req.params.projectId
         UserTemplateModel.find({ project_id: projectId }).
         exec(function (err, result) {
             if (err) {
                 callback(err);
             } else {
                 callback(result);
             }
         })
 
     }
 
     public getAllUserTemplateByProjectAndFeatureId(req, callback) {
         console.log(req.params.id)
         let featureId = req.params.featureId;
         let projectId = req.params.projectId;
         UserTemplateModel.find({ $and: [ { feature_id: featureId }, { project_id: projectId } ] }).
         exec(function (err, result) {
             if (err) {
                 callback(err);
             } else {
                 callback(result);
             }
         })
 
     }
}