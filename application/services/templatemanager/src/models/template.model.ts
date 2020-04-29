import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

const Schema = mongoose.Schema;

export const TemplateSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    'gjs-assets': [],
    'gjs-css': String,
    'gjs-styles': [String],
    'gjs-html': String,
    'gjs-components': [],
    'name': String,
    'stylesheets': [String],
    'scripts': [String],
    'template_image': [],
    'css-guidelines': [],
    'template_name': {
        type:String,
        unique: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});