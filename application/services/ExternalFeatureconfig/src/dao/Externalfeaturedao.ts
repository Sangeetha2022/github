import * as mongoose from 'mongoose';
import externalFeatureconfigModel from '../models/Externalfeatureconfig';


export class externalFeatureDao {
    private externalfeature = externalFeatureconfigModel;
    constructor() { }

    public extrnFeaturesave(value, callback) {

        console.log('------value in dao layer----', value);

        let featureconfig = new this.externalfeature(value);
        featureconfig.save((err, externalfeature) => {
            if (err) {
                callback(err);
            } else {
                callback(externalfeature);
            }
        })

    }


    public extrnfeaturegetbyId(extfeatureId,callback) {
        this.externalfeature.find({ _id: extfeatureId }).exec(function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(result);
            }
        })
    }

}