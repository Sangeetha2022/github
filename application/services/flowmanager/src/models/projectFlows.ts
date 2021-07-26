import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

export let projectFlowSchema = mongoose.Schema({

  _id: {
    type: String,
    default: uuid.v1
  },
  name: String,
  label: String,
  description: String,
  type: String,
  components: [
    { type: mongoose.Schema.Types.String, ref: 'project_flowcomponents' }
  ],
  modifiers: [
    { type: mongoose.Schema.Types.String, ref: 'default_modifiers' }
  ],
  actionOnData: String,
  createWithDefaultActivity: Number,
  flowType:String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null
  }
});



const projectFlowModel = mongoose.model('project_flows', projectFlowSchema, 'project_flows');

export default projectFlowModel;
