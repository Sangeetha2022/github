import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const FeatureSchema = new Schema({
    name: { type: String},
    description: { type: String},
    connectProject: {type: Boolean},
});