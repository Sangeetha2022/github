import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

const Schema = mongoose.Schema;

export const ProjectFeatureSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    project_id: {type: String, ref:'projects'},
    feature_id: {type: String, ref:'feature_details'}
    // name: { type: String},
    // description: { type: String},
    // connectProject: {type: Boolean},
});