import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

const Schema = mongoose.Schema;

export const FeatureDetailsSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    name: { type: String },
    description: { type: String },
    api_mang_file: { type: String },
    backed_mang_file: { type: String },
    front_mang_file: { type: String },
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: null }
});


export default FeatureDetailsSchema;
