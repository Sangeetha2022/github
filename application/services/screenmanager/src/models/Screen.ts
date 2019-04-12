import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

const Schema = mongoose.Schema;

export const ScreenSchema = new Schema({
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
    foldername: String,
    is_grid_present: {
        type: Boolean,
        default: false
    },
    grid_fields: {
        html_id: String,
        component_id: String,
        custom_field: [{
            columnid: String,
            columnname: String,
            entity: String,
            entityfield: String
        }],
        default_field: []
    },
    flows_info: [{
        html_id: { type: String, default: null },
        component_id: { type: String, default: null },
        flow: { type: String, ref: 'flows' }
    }],
    project: { type: String, ref: 'projects', default: null},
    feature: { type: String, ref: 'feature_details', default: null},
    created_at: {
        type: Date,
        default: Date.now
    }
})