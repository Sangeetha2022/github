import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import FeatureEntityModel from '../models/featureentity.model';


export class FeatureFlowEntityDao {
    private FeatureEntityFlows = FeatureEntityModel;
    public saveFeatureFlowEntity(req: Request, callback: CallableFunction) {
        let newCreateFeatureFlowEntity = new this.FeatureEntityFlows(req.body);
        newCreateFeatureFlowEntity.save((err, feature) => {
            if (err) {
                callback(err);
            } else {
                callback(feature);
            }
        });
    }

    public updateFeatureFlowEntity(req: Request, callback: CallableFunction) {
        this.FeatureEntityFlows.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, feature) => {
            if (err) {
                callback(err);
            } else {
                callback(feature);
            }
        });
    }

    public getAllFeatureFlowEntity(req: Request, callback: CallableFunction) {
        this.FeatureEntityFlows.find({}, (err, feature) => {
            if (err) {
                callback(err);
            } else {
                callback(feature);
            }
        });
    }

    public getFeatureFlowEntityByID(req: Request, callback: CallableFunction) {
        this.FeatureEntityFlows.findById(req.params.id, (err, feature) => {
            if (err) {
                callback(err);
            } else {
                callback(feature);
            }
        });
    }

    public deleteFeatureFlowEntity(req: Request, callback: CallableFunction) {
        this.FeatureEntityFlows.remove({ _id: req.params.id }, (err) => {
            if (err) {
                callback(err);
            } else {
                callback({ message: 'Successfully deleted contact!' });
            }
        });
    }
}