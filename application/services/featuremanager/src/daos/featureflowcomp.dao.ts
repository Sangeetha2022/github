import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import FeatureFlowCompsModel from '../models/fetaureflowcomp.model';


export class FeatureFlowCompDao {
    private FeatureFlowComps = FeatureFlowCompsModel;

    public saveFeatureFlowComp(req: Request, callback: CallableFunction) {
        let newCreateFeatureFlowComp = new this.FeatureFlowComps(req.body);
        newCreateFeatureFlowComp.save((err, feature) => {
            if (err) {
                callback(err);
            } else {
                callback(feature);
            }
        });
    }

    public updateFeatureFlowComp(req: Request, callback: CallableFunction) {
        this.FeatureFlowComps.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, feature) => {
            if (err) {
                callback(err);
            } else {
                callback(feature);
            }
        });
    }

    public getAllFeatureFlowComp(req: Request, callback: CallableFunction) {
        this.FeatureFlowComps.find({}, (err, feature) => {
            if (err) {
                callback(err);
            } else {
                callback(feature);
            }
        });
    }

    public getFeatureFlowCompByID(req: Request, callback: CallableFunction) {
        this.FeatureFlowComps.findById(req.params.id, (err, feature) => {
            if (err) {
                callback(err);
            } else {
                callback(feature);
            }
        });
    }

    public getFeatureFlowCompByFlowID(req: Request, callback: CallableFunction) {
        this.FeatureFlowComps.findOne({flow: req.params.id}, (err, feature) => {
            if (err) {
                callback(err);
            } else {
                callback(feature);
            }
        });
    }
    

    public deleteFeatureFlowComp(req: Request, callback: CallableFunction) {
        this.FeatureFlowComps.remove({ _id: req.params.id }, (err) => {
            if (err) {
                callback(err);
            } else {
                callback({ message: 'Successfully deleted contact!' });
            }
        });
    }
}