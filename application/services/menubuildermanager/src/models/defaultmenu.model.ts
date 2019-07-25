import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

const Schema = mongoose.Schema;

export const defaultMenuSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    english: { type: String, default: null },
    tamil: { type: String, default: null },
    spanish: { type: String, default: null }
}, { versionKey: false });

export const defaultMenuModel = mongoose.model('default_menus', defaultMenuSchema);