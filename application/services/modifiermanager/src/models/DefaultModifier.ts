import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

let defaultModifierSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v1
  },
  modifier_name: String,
  modify_target_type: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ModifierModel = mongoose.model('default_modifiers', defaultModifierSchema, 'default_modifiers');

export default ModifierModel;
