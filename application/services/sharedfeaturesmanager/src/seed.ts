import * as mongoose from 'mongoose';
import * as fs from 'fs';
import * as path from 'path'
import { gfcSchema } from './models/gfc';
import { CustomLogger } from './config/Logger';

//import { itemTagsManager, shoppingCart, wcmx_grapesjs, wcmx_wordpress } from './assets/featuresscreen';

const featuresconfig = mongoose.model('shareable_features', gfcSchema);

export class FeedSeedData {

    public listFolder = [];

    public featuresDatas() {
        new CustomLogger().showLogger('info', 'Enter into gfcSeed.ts: data check in progress');
        let testFolder = path.resolve(__dirname, '../../../../generator/services/seed/sharedfeatures/');
        fs.readdirSync(testFolder).forEach(file => {
            let folder = path.resolve(__dirname, `${testFolder}/${file}/gepfeatureconfig.json`);
            new CustomLogger().showLogger('info', `List of folder check ${file}`);
            fs.readFile(folder, 'utf-8',(err, data) => { 
                let featuresData = JSON.parse(data);
                featuresconfig.findOneAndUpdate({ feature_name: featuresData['feature_name'] },
                    featuresData, { new: true }, (err, data) => {
                        console.log('seed data', data)
                        if(data === null){
                            new CustomLogger().showLogger('info', `New feature add ${featuresData['feature_name']}`)
                            let featuresSave = new featuresconfig(featuresData);
                            featuresSave.save();
                        }
                    }
                );
            });
        });
    }
}