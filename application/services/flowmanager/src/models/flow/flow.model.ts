import * as mongoose from 'mongoose';
import User from './flow.interface';

const flowSchema = new mongoose.Schema({
  name: String,
  label: String,
  description: String,
  action_on_data: String,
  type: String,
  create_with_default_activity: Number
});

const FlowModel = mongoose.model<User & mongoose.Document>('flow', flowSchema);

export default FlowModel;
