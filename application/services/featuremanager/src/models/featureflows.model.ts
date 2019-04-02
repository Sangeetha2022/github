import * as mongoose from 'mongoose';
// import * as uuid from 'uuid';
import * as uuid from 'uuid';

const Schema = mongoose.Schema;

export const FeatureFlowsSchema = mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v1
    },
    name: String,
    label: String,
    description: String,
    screenName: String,
    methodName: String,
    action_on_data: String,
    type: String,
    create_with_default_activity: Number,
    feature_id: { type: String, ref: 'feature_details' },
    created_date: {
        type: Date,
        default: Date.now
    },
    updated_date: {
        type: Date,
        default: null
    }
});

const FeatureFlowsModel = mongoose.model('feature_flows', FeatureFlowsSchema);

export default FeatureFlowsModel;
