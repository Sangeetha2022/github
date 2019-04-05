import * as mongoose from 'mongoose';
import { ProjectFeatureSchema } from '../models/feature.model';
import { FeatureDetailsSchema } from '../models/featuredetails.model';
import { Request, Response } from 'express';

const ProjectFeature = mongoose.model('project_features', ProjectFeatureSchema);
const featureDetails = mongoose.model('feature_detail', FeatureDetailsSchema);

export class FeatureDao {

    public saveFeature(req: Request, callback: CallableFunction) {
        let newCreateFeature = new ProjectFeature(req.body);
        newCreateFeature.save((err, feature) => {
            if (err) {
                callback(err);
            } else {
                callback(feature);
            }
        });
    }

    public updateFeature(req: Request, callback: CallableFunction) {
        ProjectFeature.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, feature) => {
            if (err) {
                callback(err);
            } else {
                callback(feature);
            }
        });
    }

    public getAllFeature(req: Request, callback: CallableFunction) {
        ProjectFeature.find({}, (err, feature) => {
            if (err) {
                callback(err);
            } else {
                callback(feature);
            }
        });
    }

    public getFeatureByID(req: Request, callback: CallableFunction) {
        ProjectFeature.findById(req.params.id, (err, feature) => {
            if (err) {
                callback(err);
            } else {
                callback(feature);
            }
        });
    }

    public getFeatureByProjectId(req: Request, callback: CallableFunction) {
        console.log('feature detilas are --- ', req.params.id)
        ProjectFeature.find({ project_id: req.params.id })
            .populate({ path: 'feature_id', model: featureDetails }).then((result) => {
                callback(result);
            }).catch((err) => {
                callback(err);
            })
    }

    public deleteFeature(req: Request, callback: CallableFunction) {
        ProjectFeature.remove({ _id: req.params.id }, (err) => {
            if (err) {
                callback(err);
            } else {
                callback({ message: 'Successfully deleted contact!' });
            }
        });
    }
}