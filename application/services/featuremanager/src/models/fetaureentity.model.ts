import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const FeatureEntitySchema = new Schema({
    name: String,
    description: String,
    created_by: String,
    flow_id: { type: mongoose.Schema.Types.ObjectId, ref: 'feature_flow_comp' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null },
    field: [{
        name: { type: String, default: null },
        data_type: { type: String, default: null },
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: null },
    }]
});

const FeatureEntityModel = mongoose.model('feature_entity', FeatureEntitySchema);

export default FeatureEntityModel;
