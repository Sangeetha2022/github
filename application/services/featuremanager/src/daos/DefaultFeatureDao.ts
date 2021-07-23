import * as mongoose from 'mongoose';
import featureModel from '../models/Feature';
import { Request, Response } from 'express';
import sefFeatureModel from '../models/SefFeature';

// const Features = mongoose.model('Features', FeaturesSchema);

export class DefaultFeatureDao {

    private defaultFeature = sefFeatureModel;

    public getDefaultFeature(callback: CallableFunction) {
        this.defaultFeature.find({},{_id: false, versionKey: false}).then(response => {
            callback(response);
        }).catch((error) => {
            callback(error);
        })
    }


}