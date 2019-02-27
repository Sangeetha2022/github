import * as mongoose from 'mongoose';
import IGpConfigModel from './configuration.interface';

const gpConfigSchema = new mongoose.Schema({
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