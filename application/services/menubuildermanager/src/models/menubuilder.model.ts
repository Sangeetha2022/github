import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

const Schema = mongoose.Schema;

export const MenuBuilderSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    project: { type: String, ref: 'projects' },
    language: { type: String, default: 'en' },
    menu_builder_details: { type: String, ref: 'feature_details' },
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: null }
});