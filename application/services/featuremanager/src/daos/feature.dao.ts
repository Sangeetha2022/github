import * as mongoose from 'mongoose';
import { FeatureSchema } from '../models/feature.model';
import { Request, Response } from 'express';

const Feature = mongoose.model('Feature', FeatureSchema);

export class FeatureDao {

    public saveFeature(req: Request, callback: CallableFunction) {
        let newCreateFeature = new Feature(req.body);
        newCreateFeature.save((err, feature) => {
            if (err) {
                callback(err);
            } else {
                callback(feature);
            }
        });
    }

    public updateFeature(req: Request, callback: CallableFunction) {
        Feature.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, feature) => {
            if (err) {
                callback(err);
            } else {
                callback(feature);
            }
        });
    }

    public getAllFeature(req: Request, callback: CallableFunction) {
        Feature.find({}, (err, feature) => {
            if (err) {
                callback(err);
            } else {
                callback(feature);
            }
        });
    }

    public getFeatureByID(req: Request, callback: CallableFunction) {
        Feature.findById(req.params.id, (err, feature) => {
            if (err) {
                callback(err);
            } else {
                callback(feature);
            }
        });
    }

    public getFeatureByName(req: Request, callback: CallableFunction) {
        Feature.find({ name: req.params.name }, (err, feature) => {
            if (err) {
                callback(err);
            } else {
                callback(feature);
            }
        });
    }

    public deleteFeature(req: Request, callback: CallableFunction) {
        Feature.remove({ _id: req.params.id }, (err) => {
            if (err) {
                callback(err);
            } else {
                callback({ message: 'Successfully deleted contact!' });
            }
        });
    }
}