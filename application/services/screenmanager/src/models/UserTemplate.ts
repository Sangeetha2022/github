import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserTemplateSchema = new Schema({
    'gjs-assets': [],
    'gjs-css': String,
    'gjs-styles': [String],
    'gjs-html': String,
    'gjs-components': [],
    'project-name': String,
    'default-language': String,
    created_at: {
        type: Date,
        default: Date.now
    }
})