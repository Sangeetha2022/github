import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

const Schema = mongoose.Schema;

export const TemplateParserSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    css: {},
    cdns: [],
    metadata: {
        script: { type: String, default: null },
        style: { type: String, default: null }
    },
    date: {
        type: Date,
        default: Date.now
    }
});