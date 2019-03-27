import * as mongoose from 'mongoose';
import { ProjectFeatureSchema } from '../models/feature.model';
import { Request, Response } from 'express';

const ProjectFeature = mongoose.model('project_features', ProjectFeatureSchema);

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
        ProjectFeature.findOne({project_id:req.params.id}, (err, feature) => {
            if (err) {
                callback(err);
            } else {
                callback(feature);
            }
        });
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