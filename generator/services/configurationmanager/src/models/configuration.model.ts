import * as mongoose from 'mongoose';
import IGpConfigModel from './configuration.interface';
import * as uuid from 'uuid';
const gpConfigSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    name: String,
    label: String,
    description: String,
    value: String,
    type: String,
    sub_type: String,
    created_at: { type: Date,	default: Date.now },
    updated_at: { type: Date,	default: null },
});

const GpConfigModel = mongoose.model<IGpConfigModel & mongoose.Document>('gp_config', gpConfigSchema);

export default GpConfigModel;