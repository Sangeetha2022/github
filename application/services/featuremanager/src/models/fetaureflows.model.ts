import * as mongoose from 'mongoose';
// import * as uuid from 'uuid';

const Schema = mongoose.Schema;

export const FeatureFlowsSchema = mongoose.Schema({
    name: String,
    label: String,
    description: String,
    screenName: String,
    methodName: String,
    action_on_data: String,
    type: String,
    create_with_default_activity: Number,
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
