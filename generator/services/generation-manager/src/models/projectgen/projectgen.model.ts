import * as mongoose from 'mongoose';
import User from './projectgen.interface';
import * as uuid from 'uuid';

const projectGenSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v1
},
  project_id: String,
  project_name: String,
  user_id: String,
  user_name: String,
  status: String,
  status_message: String,
  stack_trace: String,
  claimed: String,
  created_at: { type: Date,	default: Date.now },
  updated_at: Date,
  parent_gen_id: String,
});

const ProjectGenModel = mongoose.model<User & mongoose.Document>('projectgen', projectGenSchema);

export default ProjectGenModel;
