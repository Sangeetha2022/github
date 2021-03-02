import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

export let modifierUsageSchema = mongoose.Schema({

  _id: {
    type: String,
    default: uuid.v1
  },
  modifier_id: String,
  modifier_name: String,
  description: String,
  modify_target_type: String,
  modify_target_type_id: String,
});

const projectmodifierModel = mongoose.model('modifier_usage', modifierUsageSchema, 'modifier_usage');

export default projectmodifierModel;
