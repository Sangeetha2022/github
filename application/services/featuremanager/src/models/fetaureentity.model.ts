import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const FeatureEntitySchema = new Schema({
    name: String,
    created_by: String,
    feature_id: { type: mongoose.Schema.Types.ObjectId, ref: 'feature_details' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: null },
    field: [{
        name: { type: String, default: null },
        data_type: { type: String, default: null },
        type_name: { type: String, default: null },
        description: { type: String, default: null },
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: null },
    }]
});

const FeatureEntityModel = mongoose.model('feature_entity', FeatureEntitySchema);

export default FeatureEntityModel;
