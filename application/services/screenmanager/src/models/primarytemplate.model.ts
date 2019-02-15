import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const PrimaryTemplateSchema = new Schema({
    'gjs-assets': [],
    'gjs-css': String,
    'gjs-styles': [String],
    'gjs-html': String,
    'gjs-components': [],
    'name': String,
    date: {
        type: Date,
        default: Date.now
    }
});