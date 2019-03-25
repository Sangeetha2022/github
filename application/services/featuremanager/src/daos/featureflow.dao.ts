import * as mongoose from 'mongoose';
import { FeatureSchema } from '../models/feature.model';
import { Request, Response } from 'express';
import FeatureFlowsModel from '../models/fetaureflows.model';


export class FeatureFlowDao {
    private FeatureFlows = FeatureFlowsModel;
    public saveFeatureFlow(req: Request, callback: CallableFunction) {
        let newCreateFeatureFlow = new this.FeatureFlows(req.body);
        newCreateFeatureFlow.save((err, feature) => {
            if (err) {
                callback(err);
            } else {
                callback(feature);
            }
        });
    }

    public updateFeatureFlow(req: Request, callback: CallableFunction) {
        this.FeatureFlows.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, feature) => {
            if (err) {
                callback(err);
            } else {
                callback(feature);
            }
        });
    }

    public getAllFeatureFlow(req: Request, callback: CallableFunction) {
        this.FeatureFlows.find({}, (err, feature) => {
            if (err) {
                callback(err);
            } else {
                callback(feature);
            }
        });
    }

    public getFeatureFlowByID(req: Request, callback: CallableFunction) {
        this.FeatureFlows.findById(req.params.id, (err, feature) => {
            if (err) {
                callback(err);
            } else {
                callback(feature);
            }
        });
    }

    public deleteFeatureFlow(req: Request, callback: CallableFunction) {
        this.FeatureFlows.remove({ _id: req.params.id }, (err) => {
            if (err) {
                callback(err);
            } else {
                callback({ message: 'Successfully deleted contact!' });
            }
        });
    }
}