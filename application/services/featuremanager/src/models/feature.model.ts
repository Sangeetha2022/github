import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ProjectFeatureSchema = new Schema({
    project_id: {type: mongoose.Schema.Types.ObjectId, ref:'projects'},
    feature_id: {type: mongoose.Schema.Types.ObjectId, ref:'feature_details'}
    // name: { type: String},
    // description: { type: String},
    // connectProject: {type: Boolean},
});