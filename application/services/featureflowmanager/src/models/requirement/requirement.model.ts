import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

let RequirementSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v1
  },
  flow: { type: String, ref: 'feature_flows' },
  parameters:[{
    body: {type: Array, default: null},
    params: {type: Array, default: null}
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

const RequirementModel = mongoose.model('feature_requirement', RequirementSchema);

export default RequirementModel;
