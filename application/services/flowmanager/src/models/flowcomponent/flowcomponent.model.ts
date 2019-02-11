import * as mongoose from 'mongoose';
import IFlowComponent from './flowcomponent.interface';

const flowCompSchema = new mongoose.Schema({
  name: String,
  label: String,
  type: String,
  sequence_id: String,
  dev_language: String,
  dev_framework: String,
  description: String
});

const FlowCompModel = mongoose.model<IFlowComponent & mongoose.Document>('flow_component', flowCompSchema);

export default FlowCompModel;
