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
    created_at: {
        type: Date,
        default: Date.now
    }
})