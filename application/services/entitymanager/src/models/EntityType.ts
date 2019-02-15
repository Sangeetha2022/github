import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const EntityTypeSchema = new Schema({
    typename: String,
    created_at: {
        type: Date,
        default: Date.now
    }
})