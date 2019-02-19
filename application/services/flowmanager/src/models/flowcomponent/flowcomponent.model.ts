import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

let flowCompSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v1
  },
  name: String,
  label: String,
  type: String,
  sequence_id: String,
  dev_language: String,
  dev_framework: String,
  description: String,
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

const FlowCompModel = mongoose.model('flow_component', flowCompSchema);

export default FlowCompModel;
