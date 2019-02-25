import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

const Schema = mongoose.Schema;

export const DefaultEntitySchema = new Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    project_name: String,
    project_description: String,
    project_id: String,
    user_id: String,
    user_name: String,
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
})