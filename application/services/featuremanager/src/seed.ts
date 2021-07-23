import * as mongoose from 'mongoose';
import { SefFeature } from './assets/SefFeature';
import sefFeatureModel from './models/SefFeature';
export class FeedSeedData {

    public seedSefFeature(): void {
        sefFeatureModel.findOneAndUpdate({ name: SefFeature['name'] },
        SefFeature,
            { new: true },
            (err, data) => {
         if (data === null) {
            let defaultFeature = new sefFeatureModel(SefFeature);
            defaultFeature.save()
        }
    });
    }

}