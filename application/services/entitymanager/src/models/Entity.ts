import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const EntitySchema = new Schema({
    name: String,
    description: String,
    project_id: String,
    created_by: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    last_modified_by: String,
    updated_at: Date,
    field: []
})