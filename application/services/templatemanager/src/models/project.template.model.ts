import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

const Schema = mongoose.Schema;

export const ProjectTemplateSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    flag: String,
    project_id: String,
    'navigation-type': String,
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
    'template_name': String,
    date: {
        type: Date,
        default: Date.now
    }
});