import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const FlowComponentSchema = new Schema({
    name: { type: String },
    label: { type: String },
    type: { type: String },
    sequence_id: { type: String },
    dev_language: { type: String },
    dev_framework: { type: String },
    description: { type: String }
});