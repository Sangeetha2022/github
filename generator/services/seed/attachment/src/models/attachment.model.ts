import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

const Schema = mongoose.Schema;

export const AttachmentSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    fileName: String,
    originalFilename: String,
    contentType: String,
    location: String
});