import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const FlowSchema = new Schema({
    name: { type: String},
    label: { type: String},
    description: { type: String},
    action_on_data: { type: String}
});