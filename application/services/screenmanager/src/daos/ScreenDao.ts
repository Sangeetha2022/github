/**The code changes which are made below inside a comment is that when we save the screens designer data grapesjs give us a default css 
 * and we are saving them so upon generation the same gets duplicated so to avoid that I have handled that in backend side.
 * To make any changes for that code in future please consult with Dan castillo or Kishan for more ref look at #410 in github.
 */
'use strict'
import * as mongoose from 'mongoose';
import { ScreenSchema } from '../models/Screen';
import { FeatureDetailsSchema } from '../models/featuredetails.model';

const screenModel = mongoose.model('screen', ScreenSchema);
const featureDetailModel = mongoose.model('feature_details', FeatureDetailsSchema);


export class ScreenDao {
    constructor() { }

    public createScreen(screenData, callback) {
        console.log('save template result ----- ', screenData);
        let template = new screenModel(screenData);
        template.save().then((result) => {
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
        console.log('update screen in dao --- ', req.body);
        let screendesigner = req.body;

        /** Don't make any changes in the below code without consulting with Dan Castillo or Kishan
         * For more reference check the issue number #410 July 29th 2020
         * For the technical details see top
         */
        let defaultcss = new RegExp(/{box-sizing:border-box;}body{margin-top:0px;margin-right:0px;margin-bottom:0px;margin-left:0px;}|\*/gi);
        let duplicatevalue = screendesigner['gjs-css'].match(defaultcss);
        let changedvalue  = [...new Set(duplicatevalue)];
        let csschanges = changedvalue.join('');
        const diff = (diffBy, diffMe) => diffBy.split(diffMe)
        const C = diff(screendesigner['gjs-css'], csschanges);
        csschanges += C;
        let regex = /[,\s]/g;
        csschanges = csschanges.replace(regex, '');

        console.log('---------------the final css changes-----',csschanges);
        screendesigner['gjs-css'] = csschanges;

        /** Don't make any changes in the above code without consulting with Dan Castillo or Kishan
         * For more refrence check the issue number #410 July 29th 2020
         */

        screenModel.findOneAndUpdate({ _id: req.params.id }, screendesigner , { new: true }, (err, result) => {
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
        screenModel.findByIdAndDelete(screenId, (err, screen) => {
            if (err) {
                callback(err);
            } else {
                callback({ message: 'Successfully deleted screen!' });
            }
        });
    }

    public deleteProjectScreen(projectId, callback: CallableFunction) {
        screenModel.deleteMany({ project: projectId }, (err, screen) => {
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
        screenModel.find({ $and: [{ feature: featureId }, { project: projectId }] }).
            exec(function (err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(result);
                }
            })

    }

    public getAllScreenByFeatureId(req, callback) {
        let featureId = req.params.featureId;
        screenModel.find({ feature: req.params.id }).populate({ path: 'feature', model: featureDetailModel }).
            exec(function (err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(result);
                }
            })

    }

    public getTemplateByProjectId(projectId, callback) {
        console.log('get template by projectid in screenDao -----  ', projectId);
        screenModel.find({ $and: [{ isTemplate: true }, { project: projectId }] }).
            exec(function (err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(result);
                }
            })

    }

}