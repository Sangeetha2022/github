import * as mongoose from 'mongoose';
import  featureModel  from '../models/Feature';
import { Request, Response } from 'express';

// const Features = mongoose.model('Features', FeaturesSchema);

export class FeatureDao {

    private Features = featureModel;


    public saveFeatures(featureData, callback: CallableFunction) {
        let feature = new this.Features(featureData);
        feature.save((err, features) => {
            if (err) {
                callback(err);
            } else {
                callback(features);
            }
        });
    }

    public updateFeatures(featureId, featureData, callback: CallableFunction) {
        this.Features.findOneAndUpdate({ _id: featureId }, featureData, { new: true }, (err, features) => {
            if (err) {
                callback(err);
            } else {
                callback(features);
            }
        });
    }

    public getAllFeature(callback: CallableFunction) {
        this.Features.find({}, (err, features) => {
            if(err) {
                callback(err)
            } else {
                callback(features)
            }
        });
    }

    public getFeatureById(featureId, callback: CallableFunction) {
        this.Features.findOne({_id: featureId}, (err, features) => {
            if(err) {
                callback(err)
            } else {
                callback(features)
            }
        });
    }

    public getFeatureByProjectId(projectId, callback: CallableFunction) {
        this.Features.find({project: projectId}, (err, features) => {
            if(err) {
                callback(err)
            } else {
                callback(features)
            }
        });
    }

    public deleteFeatures(featureId, callback: CallableFunction) {
        this.Features.remove({ _id: featureId }, (err, feature) => {
            if (err) {
                callback(err);
            } else {
                callback({ message: 'Successfully deleted contact!' });
            }
        });
    }

    // public getAllFlow(req: Request, callback: CallableFunction) {
    //     this.Features.find({}, (err, mflow) => {
    //         if (err) {
    //             callback(err);
    //         } else {
    //             callback(mflow);
    //         }
    //     });
    // }

    // public getFlowByID(req: Request, callback: CallableFunction) {
    //     this.Features.findById(req.params.id, (err, mflow) => {
    //         if (err) {
    //             callback(err);
    //         } else {
    //             callback(mflow);
    //         }
    //     });
    // }

    // public getFeaturesByName(req: Request, callback: CallableFunction) {
    //     this.Features.find({ component_name: req.params.name }, (err, mflow) => {
    //         if (err) {
    //             callback(err);
    //         } else {
    //             callback(mflow);
    //         }
    //     });
    // }

}