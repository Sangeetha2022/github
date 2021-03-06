import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

const Schema = mongoose.Schema;

export const NodeSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    name: String,
    description: String,
    project_id: String,
    created_by: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    last_modified_by: String,
    updated_at: {
        type: Date,
        default: null
    },
    field: [{
        _id: {
            type: String,
            default: uuid.v1
        },
        name: { type: String, default: null },
        type_name: { type: String, default: null },
        data_type: {type:String, default: null},
        description: { type: String, default: null },
        is_entity_type: {
            type: Boolean,
            default: false
        },
        is_list_type: {
            type: Boolean,
            default: false
        },
        list_type: { type: String, default: null },
        list_value: { type: String, default: null },
        entity_id: { type: String, ref: 'entity' },
        created_at: {
            type: Date,
            default: Date.now
        },
        updated_at: {
            type: Date,
            default: null
        },
    }]
})