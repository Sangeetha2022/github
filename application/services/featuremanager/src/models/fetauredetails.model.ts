import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const FeatureDetailsSchema = new Schema({
    name: { type: String },
    description: { type: String },
    api_mang_file: { type: String },
    backed_mang_file: { type: String },
    front_mang_file: { type: String },
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: null }
});

const FeatureDetailsModel = mongoose.model('feature_details', FeatureDetailsSchema);

export default FeatureDetailsModel;
