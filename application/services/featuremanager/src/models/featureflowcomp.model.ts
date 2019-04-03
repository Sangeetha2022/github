import * as mongoose from 'mongoose';
// import * as uuid from 'uuid';
import * as uuid from 'uuid';

const Schema = mongoose.Schema;

export const FeatureFlowCompsSchema = mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    flow: { type: String, ref: 'feature_flows' },
    feature_id: { type: String, ref: 'feature_details' },
    flow_comp_seq: [{
        component_name: { type: String },
        label: { type: String, default: null },
        type: { type: String, default: null },
        sequence_id: { type: Number, default: null },
        dev_language: { type: String, default: null },
        dev_framework: { type: String, default: null },
        description: { type: String, default: null },
        created_date: { type: Date, default: Date.now },
        updated_date: { type: Date, default: null }
    }],
    created_date: {
        type: Date,
        default: Date.now
    },
    updated_date: {
        type: Date,
        default: null
    }
});

const FeatureFlowCompsModel = mongoose.model('feature_flow_comp', FeatureFlowCompsSchema);

export default FeatureFlowCompsModel;
