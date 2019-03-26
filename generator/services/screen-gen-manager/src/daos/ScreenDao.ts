'use strict'
import * as mongoose from 'mongoose';
import { UserTemplateSchema } from '../models/UserTemplate';
import { PrimaryTemplateSchema } from '../models/PrimaryTemplate';

const screenModel = mongoose.model('UserTemplate', UserTemplateSchema);
const primaryTemplate = mongoose.model('PrimaryTemplate', PrimaryTemplateSchema);

export class ScreenDao {
    constructor() { }

    public generateScreen(screenData, callback) {
     
    }

    public getScreenDetails(callback) {
        screenModel.find({ }).
            exec((err, result) => {
                if (err) {
                    callback(err);
                    console.log('project id in screent dao error ---- ', err);
                } else {
                    console.log('project id in screent dao result ---- ', result);
                    callback(result);
                }
            })
    }

    public getTemplate(templateId, callback) {
        primaryTemplate.findOne({'_id': templateId}).exec((err, result) => {
            if (err) {
                callback(err);
                console.log('template dao error ---- ', err);
            } else {
                // console.log('template result ---- ', result);
                callback(result);
            }
        })
    }

}