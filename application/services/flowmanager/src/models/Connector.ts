import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ConnectorSchema = new Schema({
    name: { type: String},
    description: { type: String},
    url: { type: String}
});