import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

let RequirementSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v1
  },
  flow_id: String,
  requirementType: {
    body: { type: String, default: false },
    params: { type: String, default: false }
  },
  parameters: Array,
  created_date: {
    type: Date,
    default: Date.now
  },
  updated_date: {
    type: Date,
    default: null
  }
});

const RequirementModel = mongoose.model('feature_requirement', RequirementSchema);

export default RequirementModel;
