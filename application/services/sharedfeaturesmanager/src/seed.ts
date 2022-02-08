import * as mongoose from 'mongoose';
import { gfcSchema } from './models/gfc';
import { itemTagsManager, shoppingCart, wcmx_grapesjs, wcmx_wordpress } from './assets/featuresscreen';

const featuresconfig = mongoose.model('gepfeatures_config', gfcSchema);

export class FeedSeedData {

    public featuresDatas(){

        featuresconfig.findOneAndUpdate({ feature_name: itemTagsManager['feature_name'] },
            itemTagsManager, { new: true }, (err, data) => {
                if(data === null){
                    let featuresSave = new featuresconfig(itemTagsManager);
                    featuresSave.save();
                }
            }
        );

        featuresconfig.findOneAndUpdate({ feature_name: shoppingCart['feature_name'] },
            shoppingCart, { new: true }, (err, data) => {
                if(data === null){
                    let featuresSave = new featuresconfig(shoppingCart);
                    featuresSave.save();
                }
            }
        );

        featuresconfig.findOneAndUpdate({ feature_name: wcmx_wordpress['feature_name'] },
            wcmx_wordpress, { new: true }, (err, data) => {
                if(data === null){
                    let featuresSave = new featuresconfig(wcmx_wordpress);
                    featuresSave.save();
                }
            }
        );

        featuresconfig.findOneAndUpdate({ feature_name: wcmx_grapesjs['feature_name'] },
            wcmx_grapesjs, { new: true }, (err, data) => {
                if(data === null){
                    let featuresSave = new featuresconfig(wcmx_grapesjs);
                    featuresSave.save();
                }
            }
        );
    }
}