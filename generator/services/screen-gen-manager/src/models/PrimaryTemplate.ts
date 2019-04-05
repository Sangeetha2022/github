import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

const Schema = mongoose.Schema;

export const PrimaryTemplateSchema = new Schema({
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
    'scripts': [
        {
            src: String,
            file: { type: String, default: null },
            filename: { type: String, default: null },
            is_angular: { type: Boolean, default: false }
        }
    ],
    'stylesheets': [
        {
            href: String,
            file: { type: String, default: null },
            filename: { type: String, default: null },
            is_angular: { type: Boolean, default: false }
        }
    ],
    'asset-image': [
        {
            'image': { type: String, default: null},
            'imagename': { type: String, default: null}
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});