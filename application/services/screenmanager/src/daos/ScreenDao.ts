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


    public getScreenById(req, callback) {
        let screenId = req.params.id;
        screenModel.find({ _id: screenId }).
        exec(function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(result);
            }
        })
    }

    public updateScreen(req, callback) {
        console.log('update screen in dao --- ', req.params.id);
        console.log('update screen in dao -body-- ', req.body);
        screenModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, result) => {
            if (err) {
                console.log('err in update ---- ', err);
                callback(err);
            } else {
                console.log('successfully updated ---- ', result);
                callback(result);
            }
        });
    }

    public deleteScreen(screenId, callback: CallableFunction) {
        screenModel.remove({ _id: screenId }, (err, screen) => {
            if (err) {
                callback(err);
            } else {
                callback({ message: 'Successfully deleted screen!' });
            }
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