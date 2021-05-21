
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const taskSchema = new Schema({
   name: String,
   description: String,
   assigneeid: Number,
   collaborator: String,
   projectid: { type: Schema.Types.ObjectId, ref: 'projects' },
   duedate: Date,
   attachments: { type: Schema.Types.ObjectId, ref: 'attachment' },
   isdeleted: Boolean,
   created_at: Date,
   updated_at: Date,
   comments: { type: Schema.Types.ObjectId, ref: 'comments' },
   createdby: String,
   updateby: String,
   tag: String
})

const taskModel = mongoose.model('task', taskSchema, 'task');
export default taskModel;
