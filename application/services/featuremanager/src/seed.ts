import * as mongoose from 'mongoose';
import { FeatureSchema } from './models/feature.model';
import * as featurejson from './assests/feature.json';

const Feature = mongoose.model('Feature', FeatureSchema);

export class FeedSeedData {

    public seedFeatureData(): void {
        Feature.find({}, (err, data) => {
            if (data === null || data.length === 0) {
                featurejson.feature.map((feature) => {
                    let newFeature = new Feature(feature);
                    newFeature.save();
                })
            }
        });
    }

    public testmethod(): void {
        Feature.find({}, (err, data) => {
            if (data === null || data.length === 0) {
                featurejson.feature.map((feature) => {
                    let newFeature = new Feature(feature);
                    newFeature.save();
                })
            }
        });
    }
}