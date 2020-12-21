import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

const Schema = mongoose.Schema;

export const DefaultScreen = new Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    'gjs-assets': [],
    'gjs-css': String,
    'gjs-styles': [String],
    'gjs-html': String,
    'gjs-components': [],
    'project-name': String,
    'default-language': String,
    screenName: String,
    is_grid_present: {
        type: Boolean,
        default: false
    },
    is_bootStrapTable_present: {
        type: Boolean,
        default: false
    },
    grid_fields: {
        htmlId: String,
        componentId: String,
        custom_field: [{
            columnid: String,
            columnname: String,
            entity: String,
            entityfield: String
        }],
        default_field: []
    },
    screenType: { type: String, default: null },
    isTemplate: { type: Boolean, default: false },
})