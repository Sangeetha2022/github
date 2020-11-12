import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const configSchema = new Schema({
    socialNetwork: String,
    appId: String,
})

const configModel = mongoose.model('config', configSchema, 'config');
export default configModel;
