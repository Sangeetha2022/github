import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

const Schema = mongoose.Schema;

export const MenuBuilderSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    project: { type: String, ref: 'projects' },
    menu_option: { type: Boolean, default: null },
    language: { type: String, default: null },
    project_languages: { type: Array, default: null },
    feature: { type: Array, default: null },
    menuDetails: { type: Array, default: null },
    created_date: { type: Date, default: Date.now },
    updated_date: { type: Date, default: null }
});