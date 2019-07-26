import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

const Schema = mongoose.Schema;

export const defaultMenuSchema = new Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    english: { type: Array, default: null },
    tamil: { type: Array, default: null },
    spanish: { type: Array, default: null }
}, { versionKey: false });

export const defaultMenuModel = mongoose.model('default_menus', defaultMenuSchema);