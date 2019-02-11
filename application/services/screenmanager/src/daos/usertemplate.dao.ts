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
}