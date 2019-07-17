import * as mongoose from 'mongoose';
import * as uuid from 'uuid';
export const gpConfigSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    name: String,
    label: String,
    value: String,
    type: String,
    sub_type: String,
    created_at: { type: Date,	default: Date.now },
    updated_at: { type: Date,	default: null },
});
