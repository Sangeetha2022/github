'use strict'
import * as mongoose from 'mongoose';
import { ScreenSchema } from '../models/Screen';

const screenModel = mongoose.model('screen', ScreenSchema);

export class ScreenDao {
    constructor() { }

    public createScreen(screenData, callback) {
        let template = new screenModel(screenData);
        template.save().then((result) => {
            console.log('save template result ----- ', result);
            callback(result);
        }).catch((error) => {
            console.log('save template error -----  ', error);
            callback(error);
        });
    }

    public getAllScreen(callback) {
        screenModel.find().then((result) => {
            callback(result);
        }).catch((error) => {
            callback(error);
        });
    }

    public getAllScreenByProjectId(req, callback) {
        let projectId = req.params.projectId
         screenModel.find({ project: projectId }).
         exec(function (err, result) {
             if (err) {
                 callback(err);
             } else {
                 callback(result);
             }
         })
 
     }
 
     public getAllScreenByProjectAndFeatureId(req, callback) {
         console.log(req.params.id)
         let featureId = req.params.featureId;
         let projectId = req.params.projectId;
         screenModel.find({ $and: [ { feature: featureId }, { project: projectId } ] }).
         exec(function (err, result) {
             if (err) {
                 callback(err);
             } else {
                 callback(result);
             }
         })
 
     }
}