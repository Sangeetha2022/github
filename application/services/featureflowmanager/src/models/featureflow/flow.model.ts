import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

let flowSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v1
  },
  name: String,
  label: String,
  description: String,
  screenName: String,
  featureName: String,
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

const FlowModel = mongoose.model('feature_flows', flowSchema);

export default FlowModel;
