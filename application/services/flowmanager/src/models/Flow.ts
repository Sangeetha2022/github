import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const FlowSchema = new Schema({
    name: { type: String },
    label: { type: String },
    description: { type: String },
    action_on_data: { type: String },
    type: { type: String },
    create_with_default_activity: { type: String }
});