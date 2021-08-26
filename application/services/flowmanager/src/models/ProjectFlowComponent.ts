import * as mongoose from 'mongoose';
import * as uuid from 'uuid';

export let projectFlowComponentSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v1
  },
  name: String,
  label: String,
  description: String,
  type: String,
  sequenceId: Number,
  componentName: String,
  devLanguage: String,
  devFramework: String,
  microFlows: [{
    type: mongoose.Schema.Types.String,
    ref: 'project_micro_flows'
  }],
  connector: [
    { type: mongoose.Schema.Types.String, ref: 'connectors' }
  ],
  actionOnData: String,
  createWithDefaultActivity: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const projectFlowComponentModel = mongoose.model('project_flowcomponents', projectFlowComponentSchema, 'project_flowcomponents');
export default projectFlowComponentModel;